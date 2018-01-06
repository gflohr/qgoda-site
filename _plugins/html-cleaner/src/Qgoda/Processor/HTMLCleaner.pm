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
    	
        $output .= $text;
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

    return $output;    
}

1;
