

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>

  <div class="tweet-text <?php print $tweet_classes; ?>"><?php print check_plain($node->tweet_field['text']);?></div>

  <div class="share-links">
    <div class="twitter-link"><a href="http://twitter.com/share" class="twitter-share-button" data-url="<?php print url($node_url, array('absolute' => TRUE)); ?>" data-count="vertical" data-text="<?php print $title; ?>">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div>
    <div class="facebook-link"><iframe src="http://www.facebook.com/plugins/like.php?href=<?php print drupal_encode_path(url($node_url, array('absolute' => TRUE))); ?>&amp;send=true&amp;layout=box_count&amp;width=450&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"></iframe></div>
  </div>
</div>
