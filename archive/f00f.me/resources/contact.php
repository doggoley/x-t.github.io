<?php

/*++
    Copyright (c) cmp. All rights reserved.

    Description:
        Was used one day for contact info
        Today it's used just for overlay content
--*/

/*

Deleted block - real time contact
Since 08-01 I no longer use these services

<div class="overlay" id="contactRealTime">
    <div class="overlayContent">
        <noscript><b><br>--- Real-time contact ---</b></noscript>
        <div class="overlayClose" onclick="document.getElementById('contactRealTime').style.display = 'none'"><span class="fas fa-times"></span></div>
        <h3>XMPP</h3>
        <div style="margin-left:10px;">
            <p>Address: <a href="xmpp:cmp@ed1.club">cmp@ed1.club</a></p>
            <p><a href="/otr.txt">OTR Fingerprint</a></p>
        </div>
        <h3>IRC</h3>
        <div style="margin-left:10px;">
            <p>Username: cmpxchg8b</p>
            <p>Server: <a href="https://freenode.net">chat.freenode.net</a></p>
        </div>
    </div>
</div>
*/
?>

<div class="overlay" id="contactEmail">
    <div class="overlayContent">
        <noscript><b>--- Contact ---</b></noscript>
        <div class="overlayClose" onclick="document.getElementById('contactEmail').style.display = 'none'"><span class="fas fa-times"></span></div>
        <h3>Contact me via e-mail</h3>
        <p><span class="fas fa-envelope-open"></span> Address: <a href="mailto:cmp@airmail.cc">cmp@airmail.cc</a></p>
        <p><span class="fas fa-shield-alt"></span> <a href="/pubkey.txt">GPG Public key</a></p>
        <h3>Contact me on other platforms</h3>
        <p>XMPP: <a href="xmpp:cmp@ed1.club">cmp@ed1.club</a></p>
        <p>Matrix: <a href="https://matrix.org">@movzx:matrix.org</a></p>
        <p>Discord: <a href="https://discordapp.com">@zxyz#8479</a></p>
    </div>
</div>

<div class="overlay" id="support">
    <div class="overlayContent">
        <noscript><b>--- Support ---</b></noscript>
        <div class="overlayClose" onclick="document.getElementById('support').style.display = 'none'"><span class="fas fa-times"></span></div>
        <h3>If you're considering supporting me</h3>
        <p><em>One, why? Two, you probably shouldn't.</em></p>
        <p>But a good way to do so would be to sign up for DigitalOcean using my referral link<span class="sup">[1]</span></p>
        <p><span class="fab fa-digital-ocean"></span> <a href="https://m.do.co/c/0438eea40e50">Referral link</a></p>
        <p>You can also go into an Apple store and leave this running in the browser:</p>
        <p><span class="fab fa-bitcoin"></span> <a href="https://authedmine.com/media/miner.html?key=cDLSvt8FelYvt38hNrr2dFGv9jnAatbd">Worthless crypto mining</a></p>
        <h4>Consider throwing money directly here instead</h4>
        <p><span class="fas fa-money-bill-alt"></span> <a href="https://supporters.eff.org/donate/donate-eff-4">EFF</a></p>
        <p><span class="fas fa-money-bill-alt"></span> <a href="https://my.fsf.org/join">FSF</a></p>
        <p><small>[1]: You get $10 dollars in credit, and once you spend $25 I also get $25.</small></p>
    </div>
</div>
