
@baseFiles=qw(
d3dcompiler_47.dll
ffmpeg.dll
icudtl.dat
libEGL.dll
libGLESv2.dll
locales
natives_blob.bin
node.dll
nw.dll
nw_100_percent.pak
nw_200_percent.pak
nw_elf.dll
resources.pak
v8_context_snapshot.bin 
swiftshader/libGLESv2.dll
swiftshader/libEGL.dll
);

&mvDebug;
&mvNonDebug;

sub mvDebug {
   my $trash="nwjs-trashed";
   my $src=".";
   my @files=@baseFiles;
   push @files, "Tonyu2.exe";
   for my $f (@files) {
      my @path=split "/", $f;
      pop @path;
      $path=join "/", @path;
      &system2( "mv $src/$f $trash/$path ");
   }
}
sub mvNonDebug {
   my $trash="nwjs-trashed/Runtimes";
   my $src="Runtimes";
   my @files=@baseFiles;
   push @files, "Player2.exe";
   for my $f (@files) {
      my @path=split "/", $f;
      pop @path;
      $path=join "/", @path;
      &system2( "mv $src/$f $trash/$path ");
   }
}
sub system2 {
   print $_[0]."\n";
}
