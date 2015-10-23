open LS,"ls build/*.html |";
while (<LS>) {
   s/build\///;
   chomp;
   print "echo '$_'\n";
   print "diff build/$_ dev/$_ \n";

}
close LS;
