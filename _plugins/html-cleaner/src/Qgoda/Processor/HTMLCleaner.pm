#! /bin/false

package Qgoda::Processor::HTMLCleaner;

use strict;

use HTML::Parser;

use Qgoda::Util qw(flatten2hash);
use Qgoda::Config;

use base qw(Qgoda::Processor);

sub new {
        my ($class) = @_;

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

        if ($text =~ /^<!--\[if/i) {
        	$output .= $text;
        }        
    };
 
    my $end_handler = sub {
        my ($tagname) = @_;

        if ($output =~ />exclude$/) {
               $DB::single = 1;
        }

        my $text = "</$tagname>";

        if ('code' eq $tagname && $output =~ s/>($self->{__config_var_re})$//) {
            my $varname = $1;
            $text = qq{><a href="../configuration-variables/#$varname">$varname</a>}
                    . $text;
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
