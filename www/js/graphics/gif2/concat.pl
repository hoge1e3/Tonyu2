#!/usr/bin/perl

my $b=&cont("gif.js");
my $w=&cont("gif.worker.js");
# $b =~ s/"gif\.worker\.js"/GIF_WORKER_SRC/;
$w =~ s/sourceMappingURL/_/;
$w = qq((""+(function(){/*AAAA*/$w/*BBBB*/})).replace(/.*AAAA\\*\\//,"").replace(/\\/\\*BBBB.*/,"") ) ;
open OUT,">gif-concat.js";
print OUT "$b\n";
print OUT qq(GIF_WORKER_URL=URL.createObjectURL( new Blob([$w] ,{type:"text/javascript"} ));  );
close OUT;

sub cont {
   my $f=shift;
   my $buf="";
   open IN,$f;
   $buf.=$_ while (<IN>);
   close IN;
   $buf;
}
