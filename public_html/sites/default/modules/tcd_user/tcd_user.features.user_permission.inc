<?php
/**
 * @file
 * tcd_user.features.user_permission.inc
 */

/**
 * Implementation of hook_user_default_permissions().
 */
function tcd_user_user_default_permissions() {
  $permissions = array();

  // Exported permission: access content
  $permissions['access content'] = array(
    'name' => 'access content',
    'roles' => array(
      0 => 'administrator',
      1 => 'anonymous user',
      2 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create site content
  $permissions['create site content'] = array(
    'name' => 'create site content',
    'roles' => array(
      0 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete any site content
  $permissions['delete any site content'] = array(
    'name' => 'delete any site content',
    'roles' => array(),
  );

  // Exported permission: delete own site content
  $permissions['delete own site content'] = array(
    'name' => 'delete own site content',
    'roles' => array(
      0 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit any site content
  $permissions['edit any site content'] = array(
    'name' => 'edit any site content',
    'roles' => array(),
  );

  // Exported permission: edit own site content
  $permissions['edit own site content'] = array(
    'name' => 'edit own site content',
    'roles' => array(
      0 => 'authenticated user',
    ),
    'module' => 'node',
  );

  return $permissions;
}
