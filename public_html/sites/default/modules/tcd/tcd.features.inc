<?php
/**
 * @file
 * tcd.features.inc
 */

/**
 * Implementation of hook_node_info().
 */
function tcd_node_info() {
  $items = array(
    'site' => array(
      'name' => t('Site'),
      'base' => 'node_content',
      'description' => t('Micro site.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
