function ReadFile(file)
{
    x = ""
    while ((getline y < file) > 0) {
        x = x FS y FS "\n"
    }
    return x
}

BEGIN {
    r_noscript = ReadFile("resources/html/noscript.html")
    r_navbar = ReadFile("resources/html/navbar.html")
    r_head = ReadFile("resources/html/stdhead.html")
    r_header = ReadFile("resources/html/header.html")
}

/<!-- DESC / {
    gsub(/<!-- DESC /, "")
    gsub(/ -->/, "")
    gsub(/^[ \t]+/, "", $0)
    printf "<meta name=\"description\" content=%s>\n", $0
    next
}

/<!-- STYLE / {
    gsub(/<!-- STYLE /, "")
    gsub(/ -->/, "")
    gsub(/^[ \t]+/, "", $0)
    printf "<link rel=\"stylesheet\" href=%s>\n", $0
    next
}

{
    gsub(/<!-- NOSCRIPT -->/, r_noscript)
    gsub(/<!-- NAVBAR -->/, r_navbar)
    gsub(/<!-- HEAD -->/, r_head)
    gsub(/<!-- HEADER -->/, r_header)
    print
}
