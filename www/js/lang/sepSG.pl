# separate Semantics and GenrateJS

open IN , "compiler2.js";
open OUTG, ">JSgenerator.js";
open OUTS, ">semantics.js";
$G=1;$S=2;
$B=$G|$S;
$mask=$B;
while(<IN>) {
    if (m|//G\b|) {  $mask=$G; }
    if (m|//S\b|) {  $mask=$S; }
    if (m|//B\b|) {  $mask=$B; }
    if ($mask & $G) { print OUTG; }
    if ($mask & $S) { print OUTS; }
}
close IN;
close OUTG;
close OUTS;
