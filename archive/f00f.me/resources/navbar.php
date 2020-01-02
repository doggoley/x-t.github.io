<div class="navbar" id="MobileBar">
    <?php if ($_SERVER["PHP_SELF"] === "/index.php"): ?>
        <a href="https://f00f.me/about.php"><span class="fas fa-question-circle"></span></a>
    <?php else: ?>
        <a href="https://f00f.me/"><span class="fas fa-home"></span></a>
    <?php endif; ?>
    <a href="https://f00f.xyz"><span class="fas fa-server"></span></a>
    <a href="https://github.com/x-t"><span class="fab fa-github"></span></a>
    <a href="https://f00f.me/blog/2018.php"><span class="fas fa-rss"></span></a>
    <a href="#" class="showContact1" style="float:right;"><span class="fas fa-id-card"></span></a>
    <a href="#" class="showSupport" style="float:right;"><span class="fas fa-dollar-sign"></span></a>
    <a href="https://f00f.xyz/privacy/policy.php" style="float:right;" title="Botnet"><span class="fas fa-lock"></span></a>
</div>

<div class="navbar" id="DesktopBar">
    <?php if ($_SERVER["PHP_SELF"] === "/index.php"): ?>
        <a href="https://f00f.me/about.php"><span class="fas fa-question-circle"></span> About me</a>
    <?php else: ?>
        <a href="https://f00f.me/"><span class="fas fa-home"></span> Home</a>
    <?php endif; ?>
    <a href="https://f00f.xyz"><span class="fas fa-server"></span> Server</a>
    <a href="https://github.com/x-t"><span class="fab fa-github"></span> Github</a>
    <a href="https://f00f.me/blog/2018.php"><span class="fas fa-rss"></span> Blog</a>
    <a href="#" class="showContact1" style="float:right;"><span class="fas fa-id-card"></span> Contact</a>
    <a href="#" class="showSupport" style="float:right;"><span class="fas fa-dollar-sign"></span> Support</a>
    <a href="https://f00f.xyz/privacy/policy.php" style="float:right;" title="Botnet"><span class="fas fa-lock"></span> Privacy</a>
    <?php
    /*
    <div class="dropdown r">
      <button class="dropbtn"><span class="fas fa-id-card"></span> Contact
          <span class="fas fa-caret-down"></span>
      </button>
      <div class="dropdown-content">
          <a id="showContact0"><span class="fas fa-comments"></span> Real-time</a>
          <a id="showContact1"><span class="fas fa-envelope"></span> E-mail</a>
      </div>
    </div>
    */
    ?>
</div>
