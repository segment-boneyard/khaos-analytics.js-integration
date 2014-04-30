
describe('{{name}}', function(){

  var {{pascalcase name}} = require('integrations/lib/{{basename}}');
  var analytics = require('analytics');
  var assert = require('assert');
  var equal = require('equals');
  var sinon = require('sinon');
  var test = require('integration-tester');

  var {{camelcase name}};
  var settings = {
    // TODO: fill in this dictionary with the fake settings required to test
    // that the integration can load properly. We'll need to get test
    // credentials for every integration, so that we can make sure it is
    // working properly.
    //
    // Here's what test credentials might look like:
    //
    //   {
    //     apiKey: 'V7TLXL5WWBA5NOU5MOJQW4'
    //   }
  };

  beforeEach(function(){
    analytics.use({{pascalcase name}});
    {{camelcase name}} = new {{pascalcase name}}.Integration(settings);{{#assumesPageview}}
    {{camelcase name}}.initialize();{{/assumesPageview}}
  });

  afterEach(function(){
    {{camelcase name}}.reset();
    analytics.user().reset();
    analytics.group().reset();
  });

  it('should have the right settings', function(){
    test({{camelcase name}})
      .name('{{name}}'){{#assumesPageview}}
      .assumesPageview(){{/assumesPageview}}{{#readyOnLoad}}
      .readyOnLoad(){{else}}
      .readyOnInitialize(){{/readyOnLoad}}
      // TODO: add any additional options or globals from the source file itself
      // to this list, and they will automatically get tested against, like:
      //
      //   .option('apiKey', '')
      //   .global('__integration');
  });

  describe('#initialize', function(){
    beforeEach(function(){
      {{camelcase name}}.load = sinon.spy();
    });

    it('should initialize the {{name}} variables', function(){
      {{camelcase name}}.initialize();
      // TODO: add a check here to make sure that any globals that are created
      // on initialize are actually created on `window`, for example:
      //
      //   assert(window.__integration.apiKey === settings.apiKey);
    });

    it('should call #load', function(){
      {{camelcase name}}.initialize();
      assert({{camelcase name}}.load.called);
    });
  });

  describe('#loaded', function(){
    it('should check whether the {{name}} library has loaded', function(){
      assert(!{{camelcase name}}.loaded());
      // TODO: set the global variable that the `loaded` method should be
      // checking for here to a stub, just to make sure it works. For example:
      //
      //   window.__integration = {};
      assert({{camelcase name}}.loaded());
    });
  });

  describe('#load', function(){
    beforeEach(function(){
      sinon.stub({{camelcase name}}, 'load');
      {{camelcase name}}.initialize();
      {{camelcase name}}.load.restore();
    });

    it('should change the loaded state', function(done){
      assert(!{{camelcase name}}.loaded());
      {{camelcase name}}.load(function(err){
        if (err) return done(err);
        assert({{camelcase name}}.loaded());
        done();
      });
    });
  });
{{#assumesPageview}}
  describe('#page', function(){
    beforeEach(function(){
      {{camelcase name}}.initialize();
      // TODO: depending on how your integration works, you'll need to setup the
      // test differently. If your page view call works by call a method in your
      // integration library, then setup a spy to intercept the page view calls
      // into your integration so that their arguments can be tested:
      //
      //   window.__integration.pageView = sinon.spy();
    });


    it('should send a regular page view', function(){
      test({{camelcase name}}).page();
      // TODO: check to make sure the page view is received, for example:
      //
      //   assert(window.__integration.pageView.called);
    });

    it('should send a page view with name, category and properties', function(){
      test({{camelcase name}}).page('category', 'name', {
        referrer: 'referrer',
        title: 'title',
        url: 'url'
      });
      // TODO: check to make sure the page view is received, for example:
      //
      //   assert(window.__integration.pageView.calledWith('name', {
      //     url: 'url'
      //   });
    });

    // TODO: add any other tests that are specific to your integration. For
    // example, if you need all dates to be converted to Unix timestamps, make a
    // separate test that verifies that. See some of the other integrations
    // for inspiration.
  });
{{/assumesPageview}}{{#identify}}
  describe('#identify', function(){
    beforeEach(function(done){
      {{camelcase name}}.initialize();
      // TODO: depending on how your integration works, you'll need to setup the
      // test differently. If your identify call works by call a method in your
      // integration library, then setup a spy to intercept the identify calls
      // into your integration so that their arguments can be tested:
      //
      //   window.__integration.identify = sinon.spy();
    });

    it('should send an id', function(){
      test({{camelcase name}}).identify('id', {});
      // TODO: check to make sure the ID is received as expected, for example:
      //
      //   assert(window.__integration.userId === 'id');
    });

    it('should send traits', function(){
      test({{camelcase name}}).identify(null, { trait: true });
      // TODO: check to make sure traits are received as expected, for example:
      //
      //   assert(equal(window.__integration.properties, { trait: true }));
    });

    it('should send an id and traits', function(){
      test({{camelcase name}}).identify('id', { trait: true });
      // TODO: check to make sure both an ID and traits are received as
      // expected, for example:
      //
      //   assert(window.__integration.userId === 'id');
      //   assert(equal(window.__integration.properties, { trait: true }));
    });

    // TODO: add any other tests that are specific to your integration. For
    // example, if you need all dates to be converted to Unix timestamps, make a
    // separate test that verifies that. See some of the other integrations
    // for inspiration.
  });
{{/identify}}{{#group}}
  describe('#group', function(){
    beforeEach(function(done){
      analytics.user().identify('id');
      {{camelcase name}}.initialize();
      // TODO: depending on how your integration works, you'll need to setup the
      // test differently. If your group call works by call a method in your
      // integration library, then setup a spy to intercept the group calls
      // into your integration so that their arguments can be tested:
      //
      //   window.__integration.group = sinon.spy();
    });

    it('should send an id', function () {
      test({{camelcase name}}).group('id', {});
      // TODO: check to make sure the ID is received as expected. Depending on
      // your library, you might also want to check for the currently identified
      // user's id which is "id", for example:
      //
      //   assert(window.__integration.group.calledWith({
      //     userId: 'id',
      //     groupId: 'id',
      //     groupProperties: {}
      //   });
    });

    it('should send traits', function () {
      test({{camelcase name}}).group(null, { trait: true });
      // TODO: check to make sure traits are received as expected. Depending on
      // your library, you might also want to check for the currently identified
      // user's id which is "id", for example:
      //
      //   assert(window.__integration.group.calledWith({
      //     userId: 'id',
      //     groupId: null,
      //     groupProperties: { trait: true }
      //   });
    });

    it('should send an id and traits', function () {
      test({{camelcase name}}).group('id', { trait: true });
      // TODO: check to make sure an ID and traits are received as expected.
      // Depending on your library, you might also want to check for the
      // currently identified user's id which is "id", for example:
      //
      //   assert(window.__integration.group.calledWith({
      //     userId: 'id',
      //     groupId: 'id',
      //     groupProperties: { trait: true }
      //   });
    });

    // TODO: add any other tests that are specific to your integration. For
    // example, if you need all dates to be converted to Unix timestamps, make a
    // separate test that verifies that. See some of the other integrations
    // for inspiration.
  });
{{/group}}{{#track}}
  describe('#track', function(){
    beforeEach(function(){
      {{camelcase name}}.initialize();
      // TODO: depending on how your integration works, you'll need to setup the
      // test differently. If your track call works by call a method in your
      // integration library, then setup a spy to intercept the track calls
      // into your integration so that their arguments can be tested:
      //
      //   window.__integration.track = sinon.spy();
    });

    it('should send an event', function(){
      test({{camelcase name}}).track('event', {});
      // TODO: check to make sure the event is received. Depending on your
      // library, for example:
      //
      //   assert(window.__integration.track.calledWith('event');
    });

    it('should send an event and properties', function(){
      test({{camelcase name}}).track('event', { property: true });
      // TODO: check to make sure the event is received. Depending on your
      // library, for example:
      //
      //   assert(window.__integration.track.calledWith('event', {
      //     property: true
      //   });
    });

    // TODO: add any other tests that are specific to your integration. For
    // example, if you need all dates to be converted to Unix timestamps, make a
    // separate test that verifies that. See some of the other integrations
    // for inspiration.
  });
{{/track}}
});