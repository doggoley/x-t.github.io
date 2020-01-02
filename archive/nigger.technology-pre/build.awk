function ReadFile(file)
{
    x = ""
    while ((getline y < file) > 0) {
        x = x FS y FS "\n"
    }
    return x
}

BEGIN {
    r_navbar = ReadFile("html/navbar.html")
    r_navbar_lt = ReadFile("html/navbar_lt.html")
    r_navbar_ee = ReadFile("html/navbar_ee.html")
    r_navbar_ro = ReadFile("html/navbar_ro.html")
    r_navbar_de = ReadFile("html/navbar_de.html")
    r_navbar_pl = ReadFile("html/navbar_pl.html")
    r_navbar_cz = ReadFile("html/navbar_cz.html")
    r_navbar_it = ReadFile("html/navbar_it.html")
    r_navbar_rs = ReadFile("html/navbar_rs.html")
    r_translation_cred = ReadFile("html/translation_credits.html")
    r_head = ReadFile("html/head.html")
}

/<!-- TITLE / {
    gsub(/<!-- TITLE /, "")
    gsub(/ -->/, "")
    gsub(/^[ \t]+/, "", $0)
    printf "<title>%s</title>\n", $0
    printf "<meta name=\"twitter:title\" content=\"%s\">\n", $0
    printf "<meta name=\"og:title\" content=\"%s\">\n", $0
    next
}

/<!-- DESC / {
    gsub(/<!-- DESC /, "")
    gsub(/ -->/, "")
    gsub(/^[ \t]+/, "", $0)
    printf "<meta name=\"description\" content=\"%s\">\n", $0
    printf "<meta name=\"twitter:description\" content=\"%s\">\n", $0
    printf "<meta name=\"og:description\" content=\"%s\">\n", $0
    next
}

{
    gsub(/<!-- NAVBAR -->/, r_navbar)
    gsub(/<!-- NAVBAR_LT -->/, r_navbar_lt)
    gsub(/<!-- NAVBAR_EE -->/, r_navbar_ee)
    gsub(/<!-- NAVBAR_RO -->/, r_navbar_ro)
    gsub(/<!-- NAVBAR_DE -->/, r_navbar_de)
    gsub(/<!-- NAVBAR_PL -->/, r_navbar_pl)
    gsub(/<!-- NAVBAR_CZ -->/, r_navbar_cz)
    gsub(/<!-- NAVBAR_IT -->/, r_navbar_it)
    gsub(/<!-- NAVBAR_RS -->/, r_navbar_rs)
    gsub(/<!-- HEAD -->/, r_head)
    gsub(/<!-- TRANSLATIONS -->/, r_translation_cred)
    print
}
