<?php

function tcd_views_data() {
  // This example describes how to write hook_views_data() for the following
  // table:
  //
  // CREATE TABLE example_table (
  //   nid INT(11) NOT NULL         COMMENT 'Primary key; refers to {node}.nid.',
  //   plain_text_field VARCHAR(32) COMMENT 'Just a plain text field.',
  //   numeric_field INT(11)        COMMENT 'Just a numeric field.',
  //   boolean_field INT(1)         COMMENT 'Just an on/off field.',
  //   timestamp_field INT(8)       COMMENT 'Just a timestamp field.',
  //   PRIMARY KEY(nid)
  // );

  // The 'group' index will be used as a prefix in the UI for any of this
  // table's fields, sort criteria, etc. so it's easy to tell where they came
  // from.
  $data['tcd_tweets']['table']['group'] = t('Tweets');

  // Define this as a base table. In reality this is not very useful for
  // this table, as it isn't really a distinct object of its own, but
  // it makes a good example.
  $data['tcd_tweets']['table']['base'] = array(
    'field' => 'twitter_id', 
    'title' => t('Tweet'), 
    'help' => t("@todo"), 
    'weight' => -10,
  );

  // This table references the {node} table.
  // This creates an 'implicit' relationship to the node table, so that when 'Node'
  // is the base table, the fields are automatically available.
  $data['tcd_tweets']['table']['join'] = array(
    // Index this array by the table name to which this table refers.
    // 'left_field' is the primary key in the referenced table.
    // 'field' is the foreign key in this table.
    'node' => array(
      'left_field' => 'nid', 
      'field' => 'site_nid',
    ),
  );

  // Next, describe each of the individual fields in this table to Views. For
  // each field, you may define what field, sort, argument, and/or filter
  // handlers it supports. This will determine where in the Views interface you
  // may use the field.

  // Node ID field.
  $data['tcd_tweets']['twitter_id'] = array(
    'title' => t('Twitter ID'), 
    'help' => t('@todo'),
    'field' => array(
      'handler' => 'views_handler_field',
      'click sortable' => TRUE,
    ),
);

  // Example plain text field.
  $data['tcd_tweets']['screen_name'] = array(
    'title' => t('Screen Name'), 
    'help' => t('@todo'), 
    'field' => array(
      'handler' => 'views_handler_field', 
      'click sortable' => TRUE,
    ), 
    'sort' => array(
      'handler' => 'views_handler_sort',
    ), 
    'filter' => array(
      'handler' => 'views_handler_filter_string',
    ), 
    'argument' => array(
      'handler' => 'views_handler_argument_string',
    ),
  );

  // Example numeric text field.
  $data['tcd_tweets']['created_time'] = array(
    'title' => t('Created Time'), 
    'help' => t('@todo'), 
    'field' => array(
      'handler' => 'views_handler_field_date', 
      'click sortable' => TRUE,
    ), 
    'filter' => array(
      'handler' => 'views_handler_filter_date',
    ), 
    'sort' => array(
      'handler' => 'views_handler_sort_date',
    ),
  );

  // Example boolean field.
  $data['tcd_tweets']['text'] = array(
    'title' => t('Tweet Text'), 
    'help' => t('@todo'), 
    'field' => array(
      'handler' => 'views_handler_field', 
      'click sortable' => TRUE,
    ), 
  );

  // Node ID field.
  $data['tcd_tweets']['site_nid'] = array(
    'title' => t('Site Nid'),
    'help' => t('@todo.'),
    // Because this is a foreign key to the {node} table. This allows us to
    // have, when the view is configured with this relationship, all the fields
    // for the related node available.
    'relationship' => array(
      'base' => 'node',
      'field' => 'nid',
      'handler' => 'views_handler_relationship',
      'label' => t('Site node'),
    ),
  );


  return $data;
}

?>
