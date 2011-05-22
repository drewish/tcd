<?php
/**
 * @file
 * tcd.features.inc
 */

/**
 * Implementation of hook_ctools_plugin_api().
 */
function tcd_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => 1);
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => 1);
  }
}

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
