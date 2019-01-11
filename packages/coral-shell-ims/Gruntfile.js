/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2013 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  var dirs = {
    build: 'build',
    documentation: 'documentation'
  };

  grunt.loadNpmTasks('@coralui/coralui-grunt-componentbuilder');
  grunt.loadNpmTasks('@coralui/coralui-grunt-releasepackage');
  grunt.loadNpmTasks('@coralui/coralui-grunt-testrunner');
  grunt.loadNpmTasks('@coralui/coralui-grunt-docsbuilder');

  // Read in package.json
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    dirs: dirs,

    // Task definitions
    clean: {
      build: '<%= dirs.build %>'
    }, // clean

    // Build component
    'coralui-componentbuilder': {
      options: pkg,
      default: {}
    },

    // Release package
    'coralui-releasepackage': pkg,

    // test runner
    'coralui-testrunner': {
      options: pkg,
      default: {}
    },

    'generate-docs': {
      options: {
        packageJson: pkg
      },

      components: {
        inputPath: '<%= dirs.documentation %>',
        layoutTemplate: 'standalone-layout',
        outputPath: '<%= dirs.build %>/<%= dirs.documentation %>/{{displayName}}.html',
        fragmentTemplate: 'overview-fragment-layout',
        fragmentDest: '<%= dirs.build %>/<%= dirs.documentation %>/{{fragmentName}}.html'
      }
    }
  });

  // Default task
  grunt.task.registerTask('default', [
    'coralui-componentbuilder'
  ]);

  // Build the current package's dependencies before building
  grunt.task.registerTask('ci', [
    'coralui-componentbuilder',
    'remote-test-ci'
  ]);

  // Release the current package
  grunt.task.registerTask('release', [
    'coralui-componentbuilder',
    'coralui-releasepackage'
  ]);

};
