#! /bin/false

package Qgoda::Processor::HTMLCleaner;

use strict;

use HTML::Parser;

use Qgoda::Util qw(empty flatten2hash slugify html_escape);
use Qgoda::Config;
use Qgoda;

use base qw(Qgoda::Processor);

sub new {
        my ($class, @other) = @_;

        my $flat_config = flatten2hash(Qgoda::Config->default);
        my %vars;
        foreach my $key (keys %$flat_config) {
            my @tokens = split /\./, $key;
            my @keys = shift @tokens;
            foreach my $token (@tokens) {
                push @keys, "$keys[-1].$token";
            }
            foreach my $key (@keys) {
                $vars{$key} = 1;
            }
        }

        my $re_string = join '|', map { quotemeta } keys %vars;

	bless {
            __config_var_re => qr/$re_string/,
        }, $class;
}

sub process {
    my ($self, $content, $asset, $site) = @_;

    my $output = '';
    
    my $default_handler = sub {
    	$output .= shift;
    };
    
    my $start_handler = sub {
    	my ($text, $tag, $attr, $attrseq) = @_;
    	
    	if ('a' eq $tag 
    	    && exists $attr->{href} && $attr->{href} =~ m{https?://}) {
            push @$attrseq, 'target' if !exists $attr->{target};
            $attr->{target} = '_blank';
            
            $output .= '<' . $tag;
            foreach my $key (@$attrseq) {
            	my $value = $attr->{$key};
            	
            	my %escapes = (
            	    '"' => '&quot;',
            	    '&' => '&amp;'
            	);
            	$value =~ s/(["&])/$escapes{$1}/g;
            	$output .= qq{ $key="$value"};
            }
            $output .= '>';
    	} else {
    	    $output .= $text;
        }
    };
    
    my $comment_handler = sub {
        my ($text) = @_;

        if ('<!--TOC-->' eq $text || $text =~ /^<!--\[if/i) {
        	$output .= $text;
        }        
    };
 
    my $end_handler = sub {
        my ($tagname) = @_;

        my $text = "</$tagname>";

        if ('code' eq $tagname) {
            if ($output =~ s/>C:($self->{__config_var_re})$//) {
                my $varname = $1;
                $text = qq{><a href="../configuration-variables/#$varname">$varname</a>}
                        . $text;
            } elsif ($output =~ s{>P:([-._a-zA-Z0-9/]+$)}{}) {
                my $path = $1;
                $text = qq{><a href="../files-and-directories/#$path">$path</a>}
                        . $text;
            } elsif ($output =~ s{>V:([-._a-zA-Z0-9/]+$)}{}) {
                my $varname = $1;
                $text = qq{><a href="../template-variables/#$varname">$varname</a>}
                        . $text;
            }
        } elsif ('q-term' eq $tagname
                 && $output =~ s{<q-term>([^<]+$)}{}) {
                my $content = $1;
                my ($anchor, $label) = split /:/, $content, 2;
                $label = $anchor if empty $label;
                $anchor = lc $anchor;
                $text = qq{<a href="../terms-and-concepts/#$anchor">$label</a>};
        }

        $output .= $text;
    };

    my $parser = HTML::Parser->new(default_h => [$default_handler, 'text'],
                                   comment_h => [$comment_handler, 'text'],
                                   start_h => [$start_handler,
                                               'text, tag, attr, attrseq'],
                                   end_h => [$end_handler, 'tagname'],
                                   );
    $parser->parse($content);

    if ($output =~ /<!--TOC-->/) {
        my $toc;
        ($output, $toc) = $self->__generateTOC($output);
        my $snippet = '';
        if (@$toc) {
            my %asset = %$asset;
            $asset{toc} = $toc;

            my $tt2 = Qgoda->new->getProcessor('Qgoda::Processor::TT2');

            my $template = 'partials/body/toc.html';
            my $content = qq{[% INCLUDE $template %]};
            $snippet = $tt2->process($content, \%asset, $site);
        }
        $output =~ s/<!--TOC-->/$snippet/g;
    }

    return $output;    
}

sub __deepen {
    my ($self, $items) = @_;

    return [] if !@$items;

    my $root = {
        children => [],
    };

    foreach my $item (@$items) {
        my @path = @{$item->{path}};
        $item->{children} = [];
        my $cursor = $root->{children};
        for (my $i = 0; $i < $#path; ++$i) {
            $cursor = $cursor->[$path[$i] - 1]->{children};            
        }
        $cursor->[$path[-1] - 1] = $item;
    }

    foreach my $item (@$items) {
        delete $item->{children} if !@{$item->{children}};
    }

    return $root->{children};
}

sub __generateTOC {
    my ($self, $html) = @_;

    my @headlines = @_;
    my @path = (0);
    my $start_level = 2;
    my $lingua = 'en';
    my %slugs;
    my @items;

    my $headline = sub {
        my ($hn, $text) = @_;

        my $level = $hn - $start_level + 1;

        my $depth = @path;

        my $valid = 1;
        if ($depth > $level) {
            foreach ($level .. $depth - 1) {
                pop @path;
            }
            ++$path[-1];
        } elsif ($depth + 1 == $level) {
            push @path, 1;
        } elsif ($depth == $level) {
            ++$path[-1];
        } else {
            undef $valid;
        }

        my $anchor = '';
        if ($valid) {
            my $slug = html_escape slugify $text;
            while ($slugs{$slug}) {
                $slug .= '-';
            }
            $slugs{$slug} = 1;
            
            $anchor = qq{<a href="#" name="$slug"></a>};

            push @items, {
                slug => $slug,
                path => [@path],
                text => $text,
            };
        }

        my $replace = "$anchor<h$hn>$text</h$hn>";

        return $replace;
    };

    $html =~ s{
        <h([$start_level-6])>(.*?)</h\1>
    }{
        $headline->($1, $2);
    }gexs;
    
    my $root = $self->__deepen(\@items);
    
    return $html, $root;
}

1;
