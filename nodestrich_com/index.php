<?php
// Include the functions file
require_once 'functions.php';

// Get community data
$communityData = getCommunityData($communityId, $api_key, $curlURL);

// Check for errors
if (isset($communityData['error'])) {
    die('Error: ' . $communityData['error']);
}

// Extract community info and member list
$memberList = $communityData['data']['getCommunity']['member_list'] ?? [];
$communityDescription = $communityData['data']['getCommunity']['details']['description'] ?? null;
$communityPubId = $communityData['data']['getCommunity']['details']['pubId'] ?? null;
$memberCount = $communityData['data']['getCommunity']['member_count'] ?? null;
$totalChannels = $communityData['data']['getCommunity']['community_stats']['total_channels'] ?? null;
$totalCapacity = $communityData['data']['getCommunity']['community_stats']['total_capacity'] ?? null;

// Get member aliases
$memberResult = getMemberAliases($memberList, $api_key, $curlURL);

// Check for errors
if (isset($memberResult['error'])) {
    die('Error: ' . $memberResult['error']);
}

// Stash the array of results (pubkey & alias) into an array
$memberAliasList = $memberResult['data']['getNodeAliasBatch'] ?? [];

// Sort the member alias list
$memberAliasList = sortMemberAliases($memberAliasList);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nodestrich – A community for node runners using Nostr</title>
  <link rel="stylesheet" href="style.css">
  <!-- Basic Open Graph meta tags -->
  <meta property="og:title" content="Nodestrich – A community for node runners using Nostr">
  <meta property="og:description" content="A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy.">
  <meta property="og:image" content="https://nodestrich.com/img/social_preview.jpg">
  <meta property="og:url" content="https://nodestrich.com">
  <meta property="og:type" content="website">
  <!-- Twitter specific tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Nodestrich – A community for node runners using Nostr">
  <meta name="twitter:description" content="A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy.">
  <meta name="twitter:image" content="https://nodestrich.com/img/social_preview.jpg">
</head>
<body>
  <div class="container">
    <!-- Title and Header Row with background image and hidden text -->
    <div class="row title-row">
      <h1 class="visually-hidden">Nodestrich</h1>
    </div>

    <script>
    // Function to animate counting up
        function countUp(elementId, start, end, duration) {
            let range = end - start;
            let current = start;
            let increment = range / (duration / 10); // Adjust speed
            let obj = document.getElementById(elementId);

            let timer = setInterval(() => {
                current += increment;
                obj.innerText = Math.floor(current); // Remove decimals
                if (current >= end) {
                    obj.innerText = end; // Ensure it stops at the exact number
                    clearInterval(timer);
                }
            }, 10); // Interval in milliseconds (smooth animation)
        }
        // Run count-up on page load for multiple elements
        window.onload = function () {
          countUp("capacityCounter", 0, <?php echo intval($totalCapacity/100000000); ?>, 1500);
          countUp("channelCounter", 0, <?php echo $totalChannels; ?>, 1500);
          countUp("memberCounter", 0, <?php echo $memberCount; ?>, 1500);
        };
    </script>

    <!-- Description Row -->
    <div class="row">
      <h2>Description</h2>
      <p id="communityDescription">A community for node runners using Nostr. Users of all levels are welcome to join, open channels, share knowledge, and build the Nostr circular economy. We are active on both Telegram and Signal.<br /><br />To learn more and join, click one of the icons below:</p>
      <p class="center">
        <span>
          <a href="https://amboss.space/community/6d41c0bd-6e39-40a2-a062-a809c2e8c2b5" target="_blank"><img class="linkPic"  id="" src="img/icon_amboss.png" /></a>
          &nbsp;&nbsp;&nbsp;&nbsp;  
          <a href="https://primal.net/p/npub1hxfkcs9gvtm49702rmwn2aeuvhkd2w6f0svm4sl84g8glhzx5u9srk5p6t" target="_blank"><img class="linkPic"  id="" src="img/icon_nostr.png" /></a> 
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://t.me/+991twmY_VvFmNTQx" target="_blank"><img class="linkPic"  id="" src="img/icon_Telegram.png" /></a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://signal.group/#CjQKIPDXMEfp5ZBt-s07rtqOV8piR7-rTIGVe7sv3LiGhdUoEhCXFz4IqmGUHRwqgJpq6Fm6" target="_blank"><img class="linkPic"  id="" src="img/icon_Signal.png" /></a>
        </span>
      </p>
    </div>

    <!-- Sub Header Row -->
    <div class="row">
      <h2>Community Stats</h2>
    </div>

    <!-- Stats Row -->
    <div class="row stats-row">
      <div class="column"><h4>Member Count</h4><span id="memberCounter">0</span></div>
      <div class="column"><h4>Total Channels</h4><span id="channelCounter">0</div>
      <div class="column"><h4>Total Capacity (BTC)</h4><span id="capacityCounter">0</span></div>
    </div>

    <!-- Sub Header Row -->
    <div class="row">
      <h2>Members</h2>
    </div>

    <!-- Grid table with member aliases as links to their amboss page -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 5px; overflow-x: auto;">
      <?php foreach ($memberAliasList as $member) : ?>
      <div style="padding: 5px; text-align: center; border: 1px dashed #ccc; overflow-wrap: break-word; word-break: break-all;">
        <a href="https://amboss.space/node/<?php echo htmlspecialchars($member['pub_key']); ?>">
          <?php echo htmlspecialchars($member['alias']); ?>
        </a>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Footer Row -->
    <div class="row footer-row">
      <footer> </footer>
    </div>
  
  </div>
  <script src="script.js"></script>
</body>
</html>
