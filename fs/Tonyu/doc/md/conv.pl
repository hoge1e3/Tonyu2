use Win32::Clipboard;
$CLIP = Win32::Clipboard();

#print "Clipboard contains: ", $CLIP->Get(), "\n";
# [[a]]
#$CLIP->Set("some text to copy into the clipboard");
while(1) {
	$text=$CLIP->Get();
	@lines=split "\n",$text;
	@buf=();
	for (@lines) {
		s/^\**/"#" x length($&)/ge;
		s/\[\[([^\]]+)\]\]/&link($1)/ge;
		push @buf,$_;
	}
	$CLIP->Set(join "\n",@buf);
	print"Converted!\n";
	$CLIP->WaitForChange();
}

#$CLIP->Empty();

#$CLIP->WaitForChange();
#print "Clipboard has changed!\n";
#$CLIP->Get();

sub link {
	my $n=shift;
	($label,$to)=split(">",$n);
	$to=$label unless $to;
	return "[$label]($to)";
}
