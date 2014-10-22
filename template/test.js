
var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var plugin = require('./');
var sandbox = require('clear-env');

describe('{{name}}', function(){
  var {{pascalcase name}} = plugin;
  var {{camelcase name}};
  var analytics;
  var options = {
    // TODO: fill in this dictionary with the fake options required to test
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
    analytics = new Analytics;
    {{camelcase name}} = new {{pascalcase name}}(options);
    analytics.use(plugin);
    analytics.use(tester);
    analytics.add({{camelcase name}});
  });

  afterEach(function(){
    analytics.restore();
    analytics.reset();
    {{camelcase name}}.reset();
    sandbox();
  });

  it('should have the right settings', function(){
    // TODO: add any additional options or globals from the source file itself
    // to this list, and they will automatically get tested against, like:
    // integration('{{name}}')
    //   .global('__myIntegration')
    //   .option('apiKey', '')
    analytics.compare({{pascalcase name}}, integration('{{name}}'){{#assumesPageview}}
      .assumesPageview(){{/assumesPageview}})
  });

  describe('before loading', function(){
    beforeEach(function(){
      analytics.stub({{camelcase name}}, 'load');
    });

    afterEach(function(){
      {{camelcase name}}.reset();
    });

    describe('#initialize', function(){
      // TODO: test .initialize();
    });

    describe('should call #load', function(){
      // TODO: test that .initialize() calls `.load()`
      // you can remove this if it doesn't call `.load()`.
    });
  });

  describe('loading', function(){
    it('should load', function(done){
      analytics.load({{camelcase name}}, done);
    });
  });

  describe('after loading', function(){
    beforeEach(function(done){
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    {{^assumesPageview}}
    describe('#page', function(){
      beforeEach(function(){
        // TODO: stub the global API if needed
        // example: analytics.stub(window.api, 'logEvent');
        analytics.stub()
      });

      it('should not track unnamed pages by default', function(){
        // TODO: test that the integration does not track
        // unnamed pages by default, so `.trackAllPages` option
        // is false by default.
      });

      it('should track named pages if enabled', function(){
        {{camelcase name}}.options.trackAllPages = true;
        analytics.page();
        // TODO: assert that the api was called properly
        // analytics.called(window.api.logEvent, 'Loaded a Page');
      });

      it('should track named pages by default', function(){
        analytics.page('Name');
        // TODO: assert that the api was called properly
        // analytics.called(window.api.logEvent, 'Viewed Name Page');
      });

      it('should track named pages with a category added', function(){
        analytics.page('Category', 'Name');
        // TODO: assert that the api was called properly
        // analytics.called(window.api.logEvent, 'Viewed Category Name Page');
      });

      it('should track categorized pages by default', function(){
        analytics.page('Category', 'Name');
        // TODO: assert that the api was called properly
        // analytics.called(window.api.logEvent, 'Viewed Category Page');
      });

      it('should not track name or categorized pages if disabled', function(){
        {{camelcase name}}.options.trackNamedPages = false;
        {{camelcase name}}.options.trackCategorizedPages = false;
        analytics.page('Category', 'Name');
        // TODO: assert that the api was not called
        // analytics.didNotCall(window.api.logEvent);
      });
    });
    {{/assumesPageview}}

    {{#identify}}
    describe('#identify', function(){
      beforeEach(function(){
        // TODO: stub the integration global api.
        // For example:
        // analytics.stub(window.api, 'identify');
      });

      it('should send an id', function(){
        analytics.identify('id');
        // TODO: assert that the id is sent.
        // analytics.called(window.api.identify, 'id');
      });

      it('should send traits', function(){
        analytics.identify({ trait: true });
        // TODO: assert that the traits are sent.
        // analytics.called(window.api.identify, { trait: true });
      });

      it('should send an id and traits', function(){
        analytics.identify('id', { trait: true });
        // TODO: assert that the id and traits are sent.
        // analytics.called(window.api.identify, 'id');
        // analytics.called(window.api.identify, { id: 'id', trait: true });
      });
    });
    {{/identify}}

    {{#group}}
    describe('#group', function(){
      beforeEach(function(){
        // TODO: stub the integration global api.
        // For example:
        // analytics.stub(window.api, 'group');
      });

      it('should send an id', function(){
        analytics.group('id');
        // TODO: assert that the id is sent.
        // analytics.called(window.api.group, 'id');
      });

      it('should send traits', function(){
        analytics.group({ trait: true });
        // TODO: assert that the traits are sent.
        // analytics.called(window.api.group, { trait: true });
      });

      it('should send an id and traits', function(){
        analytics.group('id', { trait: true });
        // TODO: assert that the id and traits are sent.
        // analytics.called(window.api.group, 'id');
        // analytics.called(window.api.group, { id: 'id', trait: true });
      });
    });
    {{/group}}

    {{#track}}
    describe('#track', function(){
      beforeEach(function(){
        // TODO: stub the integration global api.
        // for example:
        // analytics.stub(window.api, 'logEvent');
      });

      it('should send an event', function(){
        analytics.track('event');
        // TODO: assert that the event is sent.
        // analytics.called(window.api.logEvent, 'event');
      });

      it('should send an event and properties', function(){
        analytics.track('event', { property: true });
        // TODO: assert that the event is sent.
        // analytics.called(window.api.logEvent, 'event', { property: true });
      });
    });
    {{/track}}
  });
});
