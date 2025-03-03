#! /bin/false

package Qgoda::PostProcessor::Schema;

use strict;

use Qgoda;

use base qw(Qgoda::PostProcessor);

die;

sub postProcess {
	my ($self) = @_;

	my $qgoda = Qgoda->new;
	my $version = $Qgoda::VERSION;

my $logger = $qgoda->logger;
$logger->info($version);
warn $version;
}

1;
