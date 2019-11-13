# perl update-nwjs.pl d:/workspace/node_tonyu/nwjs-sdk-v0.39.1-win-x64 d:/workspace/node_tonyu/nwjs-v0.39.1-win-x64 | sh

# debugDir: hack icon of nw.exe and save as Tonyu2.exe
$debugDir=$ARGV[0];
# nonDebugDir: hack icon of nw.exe and save as Player2.exe
$nonDebugDir=$ARGV[1];


@baseFiles=qw(
d3dcompiler_47.dll
ffmpeg.dll
icudtl.dat
libEGL.dll
libGLESv2.dll
locales/*
natives_blob.bin
node.dll
nw.dll
nw_100_percent.pak
nw_200_percent.pak
nw_elf.dll
resources.pak
v8_context_snapshot.bin
);
#swiftshader/libGLESv2.dll
#swiftshader/libEGL.dll

&copyDebug;
&copyNonDebug;

sub copyDebug {
   my $dst=".";
   my $src=$debugDir;
   my @files=@baseFiles;
   push @files, "Tonyu2.exe";
   for my $f (@files) {
      my @path=split "/", $f;
      pop @path;
      $path=join "/", @path;
      unless (-e "$src/$f") {
         print "Not found: $src/$f\n";
      }
      &system2( "cp $src/$f $dst/$path ");
   }
}
sub copyNonDebug {
   my $dst="Runtimes";
   my $src=$nonDebugDir;
   my @files=@baseFiles;
   push @files, "Player2.exe";
   for my $f (@files) {
      my @path=split "/", $f;
      pop @path;
      $path=join "/", @path;
      unless (-e "$src/$f") {
         print "Not found: $src/$f\n";
      }
      &system2( "cp $src/$f $dst/$path ");
   }
}
sub system2 {
   print $_[0]."\n";
}
