
while(<>) {
	/\[\[([^\]]+)\]\]/&link($1)/ge;
}

sub link {
	[$1]($1.md)
}
