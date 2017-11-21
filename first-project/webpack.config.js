const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/AsyncSubject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\AsyncSubject.js",
      "rxjs/BehaviorSubject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\BehaviorSubject.js",
      "rxjs/InnerSubscriber": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\InnerSubscriber.js",
      "rxjs/Notification": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Notification.js",
      "rxjs/Observable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Observable.js",
      "rxjs/Observer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Observer.js",
      "rxjs/Operator": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Operator.js",
      "rxjs/OuterSubscriber": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\OuterSubscriber.js",
      "rxjs/ReplaySubject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\ReplaySubject.js",
      "rxjs/Rx": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Rx.js",
      "rxjs/Scheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Scheduler.js",
      "rxjs/Subject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Subject.js",
      "rxjs/SubjectSubscription": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\SubjectSubscription.js",
      "rxjs/Subscriber": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Subscriber.js",
      "rxjs/Subscription": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\Subscription.js",
      "rxjs/add/observable/bindCallback": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\bindCallback.js",
      "rxjs/add/observable/bindNodeCallback": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\bindNodeCallback.js",
      "rxjs/add/observable/combineLatest": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\combineLatest.js",
      "rxjs/add/observable/concat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\concat.js",
      "rxjs/add/observable/defer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\defer.js",
      "rxjs/add/observable/dom/ajax": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\ajax.js",
      "rxjs/add/observable/dom/webSocket": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\webSocket.js",
      "rxjs/add/observable/empty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\empty.js",
      "rxjs/add/observable/forkJoin": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\forkJoin.js",
      "rxjs/add/observable/from": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\from.js",
      "rxjs/add/observable/fromEvent": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEvent.js",
      "rxjs/add/observable/fromEventPattern": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEventPattern.js",
      "rxjs/add/observable/fromPromise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\fromPromise.js",
      "rxjs/add/observable/generate": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\generate.js",
      "rxjs/add/observable/if": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\if.js",
      "rxjs/add/observable/interval": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\interval.js",
      "rxjs/add/observable/merge": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\merge.js",
      "rxjs/add/observable/never": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\never.js",
      "rxjs/add/observable/of": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\of.js",
      "rxjs/add/observable/onErrorResumeNext": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\onErrorResumeNext.js",
      "rxjs/add/observable/pairs": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\pairs.js",
      "rxjs/add/observable/race": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\race.js",
      "rxjs/add/observable/range": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\range.js",
      "rxjs/add/observable/throw": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\throw.js",
      "rxjs/add/observable/timer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\timer.js",
      "rxjs/add/observable/using": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\using.js",
      "rxjs/add/observable/zip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\observable\\zip.js",
      "rxjs/add/operator/audit": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\audit.js",
      "rxjs/add/operator/auditTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\auditTime.js",
      "rxjs/add/operator/buffer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\buffer.js",
      "rxjs/add/operator/bufferCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferCount.js",
      "rxjs/add/operator/bufferTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferTime.js",
      "rxjs/add/operator/bufferToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferToggle.js",
      "rxjs/add/operator/bufferWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferWhen.js",
      "rxjs/add/operator/catch": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\catch.js",
      "rxjs/add/operator/combineAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\combineAll.js",
      "rxjs/add/operator/combineLatest": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\combineLatest.js",
      "rxjs/add/operator/concat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\concat.js",
      "rxjs/add/operator/concatAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\concatAll.js",
      "rxjs/add/operator/concatMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMap.js",
      "rxjs/add/operator/concatMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMapTo.js",
      "rxjs/add/operator/count": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\count.js",
      "rxjs/add/operator/debounce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\debounce.js",
      "rxjs/add/operator/debounceTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\debounceTime.js",
      "rxjs/add/operator/defaultIfEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\defaultIfEmpty.js",
      "rxjs/add/operator/delay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\delay.js",
      "rxjs/add/operator/delayWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\delayWhen.js",
      "rxjs/add/operator/dematerialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\dematerialize.js",
      "rxjs/add/operator/distinct": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\distinct.js",
      "rxjs/add/operator/distinctUntilChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilChanged.js",
      "rxjs/add/operator/distinctUntilKeyChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilKeyChanged.js",
      "rxjs/add/operator/do": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\do.js",
      "rxjs/add/operator/elementAt": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\elementAt.js",
      "rxjs/add/operator/every": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\every.js",
      "rxjs/add/operator/exhaust": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaust.js",
      "rxjs/add/operator/exhaustMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaustMap.js",
      "rxjs/add/operator/expand": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\expand.js",
      "rxjs/add/operator/filter": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\filter.js",
      "rxjs/add/operator/finally": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\finally.js",
      "rxjs/add/operator/find": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\find.js",
      "rxjs/add/operator/findIndex": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\findIndex.js",
      "rxjs/add/operator/first": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\first.js",
      "rxjs/add/operator/groupBy": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\groupBy.js",
      "rxjs/add/operator/ignoreElements": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\ignoreElements.js",
      "rxjs/add/operator/isEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\isEmpty.js",
      "rxjs/add/operator/last": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\last.js",
      "rxjs/add/operator/let": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\let.js",
      "rxjs/add/operator/map": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\map.js",
      "rxjs/add/operator/mapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\mapTo.js",
      "rxjs/add/operator/materialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\materialize.js",
      "rxjs/add/operator/max": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\max.js",
      "rxjs/add/operator/merge": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\merge.js",
      "rxjs/add/operator/mergeAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeAll.js",
      "rxjs/add/operator/mergeMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMap.js",
      "rxjs/add/operator/mergeMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMapTo.js",
      "rxjs/add/operator/mergeScan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeScan.js",
      "rxjs/add/operator/min": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\min.js",
      "rxjs/add/operator/multicast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\multicast.js",
      "rxjs/add/operator/observeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\observeOn.js",
      "rxjs/add/operator/onErrorResumeNext": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\onErrorResumeNext.js",
      "rxjs/add/operator/pairwise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\pairwise.js",
      "rxjs/add/operator/partition": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\partition.js",
      "rxjs/add/operator/pluck": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\pluck.js",
      "rxjs/add/operator/publish": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\publish.js",
      "rxjs/add/operator/publishBehavior": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\publishBehavior.js",
      "rxjs/add/operator/publishLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\publishLast.js",
      "rxjs/add/operator/publishReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\publishReplay.js",
      "rxjs/add/operator/race": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\race.js",
      "rxjs/add/operator/reduce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\reduce.js",
      "rxjs/add/operator/repeat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\repeat.js",
      "rxjs/add/operator/repeatWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\repeatWhen.js",
      "rxjs/add/operator/retry": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\retry.js",
      "rxjs/add/operator/retryWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\retryWhen.js",
      "rxjs/add/operator/sample": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\sample.js",
      "rxjs/add/operator/sampleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\sampleTime.js",
      "rxjs/add/operator/scan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\scan.js",
      "rxjs/add/operator/sequenceEqual": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\sequenceEqual.js",
      "rxjs/add/operator/share": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\share.js",
      "rxjs/add/operator/shareReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\shareReplay.js",
      "rxjs/add/operator/single": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\single.js",
      "rxjs/add/operator/skip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\skip.js",
      "rxjs/add/operator/skipLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\skipLast.js",
      "rxjs/add/operator/skipUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\skipUntil.js",
      "rxjs/add/operator/skipWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\skipWhile.js",
      "rxjs/add/operator/startWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\startWith.js",
      "rxjs/add/operator/subscribeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\subscribeOn.js",
      "rxjs/add/operator/switch": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\switch.js",
      "rxjs/add/operator/switchMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMap.js",
      "rxjs/add/operator/switchMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMapTo.js",
      "rxjs/add/operator/take": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\take.js",
      "rxjs/add/operator/takeLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\takeLast.js",
      "rxjs/add/operator/takeUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\takeUntil.js",
      "rxjs/add/operator/takeWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\takeWhile.js",
      "rxjs/add/operator/throttle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\throttle.js",
      "rxjs/add/operator/throttleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\throttleTime.js",
      "rxjs/add/operator/timeInterval": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\timeInterval.js",
      "rxjs/add/operator/timeout": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\timeout.js",
      "rxjs/add/operator/timeoutWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\timeoutWith.js",
      "rxjs/add/operator/timestamp": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\timestamp.js",
      "rxjs/add/operator/toArray": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\toArray.js",
      "rxjs/add/operator/toPromise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\toPromise.js",
      "rxjs/add/operator/window": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\window.js",
      "rxjs/add/operator/windowCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\windowCount.js",
      "rxjs/add/operator/windowTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\windowTime.js",
      "rxjs/add/operator/windowToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\windowToggle.js",
      "rxjs/add/operator/windowWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\windowWhen.js",
      "rxjs/add/operator/withLatestFrom": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\withLatestFrom.js",
      "rxjs/add/operator/zip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\zip.js",
      "rxjs/add/operator/zipAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\add\\operator\\zipAll.js",
      "rxjs/interfaces": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\interfaces.js",
      "rxjs/observable/ArrayLikeObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ArrayLikeObservable.js",
      "rxjs/observable/ArrayObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ArrayObservable.js",
      "rxjs/observable/BoundCallbackObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\BoundCallbackObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\BoundNodeCallbackObservable.js",
      "rxjs/observable/ConnectableObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ConnectableObservable.js",
      "rxjs/observable/DeferObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\DeferObservable.js",
      "rxjs/observable/EmptyObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\EmptyObservable.js",
      "rxjs/observable/ErrorObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ErrorObservable.js",
      "rxjs/observable/ForkJoinObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ForkJoinObservable.js",
      "rxjs/observable/FromEventObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\FromEventObservable.js",
      "rxjs/observable/FromEventPatternObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\FromEventPatternObservable.js",
      "rxjs/observable/FromObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\FromObservable.js",
      "rxjs/observable/GenerateObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\GenerateObservable.js",
      "rxjs/observable/IfObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\IfObservable.js",
      "rxjs/observable/IntervalObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\IntervalObservable.js",
      "rxjs/observable/IteratorObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\IteratorObservable.js",
      "rxjs/observable/NeverObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\NeverObservable.js",
      "rxjs/observable/PairsObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\PairsObservable.js",
      "rxjs/observable/PromiseObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\PromiseObservable.js",
      "rxjs/observable/RangeObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\RangeObservable.js",
      "rxjs/observable/ScalarObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\ScalarObservable.js",
      "rxjs/observable/SubscribeOnObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\SubscribeOnObservable.js",
      "rxjs/observable/TimerObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\TimerObservable.js",
      "rxjs/observable/UsingObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\UsingObservable.js",
      "rxjs/observable/bindCallback": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\bindCallback.js",
      "rxjs/observable/bindNodeCallback": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\bindNodeCallback.js",
      "rxjs/observable/combineLatest": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\combineLatest.js",
      "rxjs/observable/concat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\concat.js",
      "rxjs/observable/defer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\defer.js",
      "rxjs/observable/dom/AjaxObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\dom\\AjaxObservable.js",
      "rxjs/observable/dom/WebSocketSubject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\dom\\WebSocketSubject.js",
      "rxjs/observable/dom/ajax": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\dom\\ajax.js",
      "rxjs/observable/dom/webSocket": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\dom\\webSocket.js",
      "rxjs/observable/empty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\empty.js",
      "rxjs/observable/forkJoin": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\forkJoin.js",
      "rxjs/observable/from": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\from.js",
      "rxjs/observable/fromEvent": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\fromEvent.js",
      "rxjs/observable/fromEventPattern": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\fromEventPattern.js",
      "rxjs/observable/fromPromise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\fromPromise.js",
      "rxjs/observable/generate": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\generate.js",
      "rxjs/observable/if": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\if.js",
      "rxjs/observable/interval": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\interval.js",
      "rxjs/observable/merge": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\merge.js",
      "rxjs/observable/never": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\never.js",
      "rxjs/observable/of": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\of.js",
      "rxjs/observable/onErrorResumeNext": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\onErrorResumeNext.js",
      "rxjs/observable/pairs": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\pairs.js",
      "rxjs/observable/race": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\race.js",
      "rxjs/observable/range": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\range.js",
      "rxjs/observable/throw": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\throw.js",
      "rxjs/observable/timer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\timer.js",
      "rxjs/observable/using": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\using.js",
      "rxjs/observable/zip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\observable\\zip.js",
      "rxjs/operator/audit": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\audit.js",
      "rxjs/operator/auditTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\auditTime.js",
      "rxjs/operator/buffer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\buffer.js",
      "rxjs/operator/bufferCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\bufferCount.js",
      "rxjs/operator/bufferTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\bufferTime.js",
      "rxjs/operator/bufferToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\bufferToggle.js",
      "rxjs/operator/bufferWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\bufferWhen.js",
      "rxjs/operator/catch": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\catch.js",
      "rxjs/operator/combineAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\combineAll.js",
      "rxjs/operator/combineLatest": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\combineLatest.js",
      "rxjs/operator/concat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\concat.js",
      "rxjs/operator/concatAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\concatAll.js",
      "rxjs/operator/concatMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\concatMap.js",
      "rxjs/operator/concatMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\concatMapTo.js",
      "rxjs/operator/count": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\count.js",
      "rxjs/operator/debounce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\debounce.js",
      "rxjs/operator/debounceTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\debounceTime.js",
      "rxjs/operator/defaultIfEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\defaultIfEmpty.js",
      "rxjs/operator/delay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\delay.js",
      "rxjs/operator/delayWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\delayWhen.js",
      "rxjs/operator/dematerialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\dematerialize.js",
      "rxjs/operator/distinct": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\distinct.js",
      "rxjs/operator/distinctUntilChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilChanged.js",
      "rxjs/operator/distinctUntilKeyChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilKeyChanged.js",
      "rxjs/operator/do": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\do.js",
      "rxjs/operator/elementAt": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\elementAt.js",
      "rxjs/operator/every": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\every.js",
      "rxjs/operator/exhaust": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\exhaust.js",
      "rxjs/operator/exhaustMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\exhaustMap.js",
      "rxjs/operator/expand": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\expand.js",
      "rxjs/operator/filter": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\filter.js",
      "rxjs/operator/finally": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\finally.js",
      "rxjs/operator/find": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\find.js",
      "rxjs/operator/findIndex": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\findIndex.js",
      "rxjs/operator/first": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\first.js",
      "rxjs/operator/groupBy": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\groupBy.js",
      "rxjs/operator/ignoreElements": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\ignoreElements.js",
      "rxjs/operator/isEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\isEmpty.js",
      "rxjs/operator/last": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\last.js",
      "rxjs/operator/let": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\let.js",
      "rxjs/operator/map": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\map.js",
      "rxjs/operator/mapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\mapTo.js",
      "rxjs/operator/materialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\materialize.js",
      "rxjs/operator/max": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\max.js",
      "rxjs/operator/merge": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\merge.js",
      "rxjs/operator/mergeAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\mergeAll.js",
      "rxjs/operator/mergeMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\mergeMap.js",
      "rxjs/operator/mergeMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\mergeMapTo.js",
      "rxjs/operator/mergeScan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\mergeScan.js",
      "rxjs/operator/min": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\min.js",
      "rxjs/operator/multicast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\multicast.js",
      "rxjs/operator/observeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\observeOn.js",
      "rxjs/operator/onErrorResumeNext": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\onErrorResumeNext.js",
      "rxjs/operator/pairwise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\pairwise.js",
      "rxjs/operator/partition": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\partition.js",
      "rxjs/operator/pluck": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\pluck.js",
      "rxjs/operator/publish": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\publish.js",
      "rxjs/operator/publishBehavior": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\publishBehavior.js",
      "rxjs/operator/publishLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\publishLast.js",
      "rxjs/operator/publishReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\publishReplay.js",
      "rxjs/operator/race": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\race.js",
      "rxjs/operator/reduce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\reduce.js",
      "rxjs/operator/repeat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\repeat.js",
      "rxjs/operator/repeatWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\repeatWhen.js",
      "rxjs/operator/retry": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\retry.js",
      "rxjs/operator/retryWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\retryWhen.js",
      "rxjs/operator/sample": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\sample.js",
      "rxjs/operator/sampleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\sampleTime.js",
      "rxjs/operator/scan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\scan.js",
      "rxjs/operator/sequenceEqual": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\sequenceEqual.js",
      "rxjs/operator/share": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\share.js",
      "rxjs/operator/shareReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\shareReplay.js",
      "rxjs/operator/single": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\single.js",
      "rxjs/operator/skip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\skip.js",
      "rxjs/operator/skipLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\skipLast.js",
      "rxjs/operator/skipUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\skipUntil.js",
      "rxjs/operator/skipWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\skipWhile.js",
      "rxjs/operator/startWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\startWith.js",
      "rxjs/operator/subscribeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\subscribeOn.js",
      "rxjs/operator/switch": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\switch.js",
      "rxjs/operator/switchMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\switchMap.js",
      "rxjs/operator/switchMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\switchMapTo.js",
      "rxjs/operator/take": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\take.js",
      "rxjs/operator/takeLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\takeLast.js",
      "rxjs/operator/takeUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\takeUntil.js",
      "rxjs/operator/takeWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\takeWhile.js",
      "rxjs/operator/throttle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\throttle.js",
      "rxjs/operator/throttleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\throttleTime.js",
      "rxjs/operator/timeInterval": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\timeInterval.js",
      "rxjs/operator/timeout": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\timeout.js",
      "rxjs/operator/timeoutWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\timeoutWith.js",
      "rxjs/operator/timestamp": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\timestamp.js",
      "rxjs/operator/toArray": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\toArray.js",
      "rxjs/operator/toPromise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\toPromise.js",
      "rxjs/operator/window": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\window.js",
      "rxjs/operator/windowCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\windowCount.js",
      "rxjs/operator/windowTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\windowTime.js",
      "rxjs/operator/windowToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\windowToggle.js",
      "rxjs/operator/windowWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\windowWhen.js",
      "rxjs/operator/withLatestFrom": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\withLatestFrom.js",
      "rxjs/operator/zip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\zip.js",
      "rxjs/operator/zipAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operator\\zipAll.js",
      "rxjs/operators/audit": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\audit.js",
      "rxjs/operators/auditTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\auditTime.js",
      "rxjs/operators/buffer": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\buffer.js",
      "rxjs/operators/bufferCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\bufferCount.js",
      "rxjs/operators/bufferTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\bufferTime.js",
      "rxjs/operators/bufferToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\bufferToggle.js",
      "rxjs/operators/bufferWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\bufferWhen.js",
      "rxjs/operators/catchError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\catchError.js",
      "rxjs/operators/combineAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\combineAll.js",
      "rxjs/operators/combineLatest": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\combineLatest.js",
      "rxjs/operators/concat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\concat.js",
      "rxjs/operators/concatAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\concatAll.js",
      "rxjs/operators/concatMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\concatMap.js",
      "rxjs/operators/concatMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\concatMapTo.js",
      "rxjs/operators/count": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\count.js",
      "rxjs/operators/debounce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\debounce.js",
      "rxjs/operators/debounceTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\debounceTime.js",
      "rxjs/operators/defaultIfEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\defaultIfEmpty.js",
      "rxjs/operators/delay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\delay.js",
      "rxjs/operators/delayWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\delayWhen.js",
      "rxjs/operators/dematerialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\dematerialize.js",
      "rxjs/operators/distinct": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\distinct.js",
      "rxjs/operators/distinctUntilChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilChanged.js",
      "rxjs/operators/distinctUntilKeyChanged": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilKeyChanged.js",
      "rxjs/operators/elementAt": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\elementAt.js",
      "rxjs/operators/every": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\every.js",
      "rxjs/operators/exhaust": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\exhaust.js",
      "rxjs/operators/exhaustMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\exhaustMap.js",
      "rxjs/operators/expand": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\expand.js",
      "rxjs/operators/filter": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\filter.js",
      "rxjs/operators/finalize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\finalize.js",
      "rxjs/operators/find": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\find.js",
      "rxjs/operators/findIndex": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\findIndex.js",
      "rxjs/operators/first": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\first.js",
      "rxjs/operators/groupBy": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\groupBy.js",
      "rxjs/operators/ignoreElements": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\ignoreElements.js",
      "rxjs/operators/index": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\index.js",
      "rxjs/operators/isEmpty": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\isEmpty.js",
      "rxjs/operators/last": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\last.js",
      "rxjs/operators/map": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\map.js",
      "rxjs/operators/mapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\mapTo.js",
      "rxjs/operators/materialize": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\materialize.js",
      "rxjs/operators/max": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\max.js",
      "rxjs/operators/merge": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\merge.js",
      "rxjs/operators/mergeAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\mergeAll.js",
      "rxjs/operators/mergeMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\mergeMap.js",
      "rxjs/operators/mergeMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\mergeMapTo.js",
      "rxjs/operators/mergeScan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\mergeScan.js",
      "rxjs/operators/min": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\min.js",
      "rxjs/operators/multicast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\multicast.js",
      "rxjs/operators/observeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\observeOn.js",
      "rxjs/operators/onErrorResumeNext": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\onErrorResumeNext.js",
      "rxjs/operators/pairwise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\pairwise.js",
      "rxjs/operators/partition": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\partition.js",
      "rxjs/operators/pluck": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\pluck.js",
      "rxjs/operators/publish": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\publish.js",
      "rxjs/operators/publishBehavior": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\publishBehavior.js",
      "rxjs/operators/publishLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\publishLast.js",
      "rxjs/operators/publishReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\publishReplay.js",
      "rxjs/operators/race": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\race.js",
      "rxjs/operators/reduce": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\reduce.js",
      "rxjs/operators/refCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\refCount.js",
      "rxjs/operators/repeat": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\repeat.js",
      "rxjs/operators/repeatWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\repeatWhen.js",
      "rxjs/operators/retry": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\retry.js",
      "rxjs/operators/retryWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\retryWhen.js",
      "rxjs/operators/sample": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\sample.js",
      "rxjs/operators/sampleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\sampleTime.js",
      "rxjs/operators/scan": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\scan.js",
      "rxjs/operators/sequenceEqual": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\sequenceEqual.js",
      "rxjs/operators/share": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\share.js",
      "rxjs/operators/shareReplay": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\shareReplay.js",
      "rxjs/operators/single": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\single.js",
      "rxjs/operators/skip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\skip.js",
      "rxjs/operators/skipLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\skipLast.js",
      "rxjs/operators/skipUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\skipUntil.js",
      "rxjs/operators/skipWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\skipWhile.js",
      "rxjs/operators/startWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\startWith.js",
      "rxjs/operators/subscribeOn": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\subscribeOn.js",
      "rxjs/operators/switchAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\switchAll.js",
      "rxjs/operators/switchMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\switchMap.js",
      "rxjs/operators/switchMapTo": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\switchMapTo.js",
      "rxjs/operators/take": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\take.js",
      "rxjs/operators/takeLast": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\takeLast.js",
      "rxjs/operators/takeUntil": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\takeUntil.js",
      "rxjs/operators/takeWhile": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\takeWhile.js",
      "rxjs/operators/tap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\tap.js",
      "rxjs/operators/throttle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\throttle.js",
      "rxjs/operators/throttleTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\throttleTime.js",
      "rxjs/operators/timeInterval": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\timeInterval.js",
      "rxjs/operators/timeout": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\timeout.js",
      "rxjs/operators/timeoutWith": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\timeoutWith.js",
      "rxjs/operators/timestamp": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\timestamp.js",
      "rxjs/operators/toArray": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\toArray.js",
      "rxjs/operators/window": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\window.js",
      "rxjs/operators/windowCount": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\windowCount.js",
      "rxjs/operators/windowTime": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\windowTime.js",
      "rxjs/operators/windowToggle": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\windowToggle.js",
      "rxjs/operators/windowWhen": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\windowWhen.js",
      "rxjs/operators/withLatestFrom": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\withLatestFrom.js",
      "rxjs/operators/zip": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\zip.js",
      "rxjs/operators/zipAll": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\zipAll.js",
      "rxjs/scheduler/Action": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\Action.js",
      "rxjs/scheduler/AnimationFrameAction": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameScheduler.js",
      "rxjs/scheduler/AsapAction": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AsapAction.js",
      "rxjs/scheduler/AsapScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AsapScheduler.js",
      "rxjs/scheduler/AsyncAction": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncAction.js",
      "rxjs/scheduler/AsyncScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncScheduler.js",
      "rxjs/scheduler/QueueAction": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\QueueAction.js",
      "rxjs/scheduler/QueueScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\QueueScheduler.js",
      "rxjs/scheduler/VirtualTimeScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\VirtualTimeScheduler.js",
      "rxjs/scheduler/animationFrame": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\animationFrame.js",
      "rxjs/scheduler/asap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\asap.js",
      "rxjs/scheduler/async": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\async.js",
      "rxjs/scheduler/queue": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\scheduler\\queue.js",
      "rxjs/symbol/iterator": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\symbol\\iterator.js",
      "rxjs/symbol/observable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\symbol\\observable.js",
      "rxjs/symbol/rxSubscriber": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\symbol\\rxSubscriber.js",
      "rxjs/testing/ColdObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\ColdObservable.js",
      "rxjs/testing/HotObservable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\HotObservable.js",
      "rxjs/testing/SubscriptionLog": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLog.js",
      "rxjs/testing/SubscriptionLoggable": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLoggable.js",
      "rxjs/testing/TestMessage": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\TestMessage.js",
      "rxjs/testing/TestScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\testing\\TestScheduler.js",
      "rxjs/util/AnimationFrame": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\AnimationFrame.js",
      "rxjs/util/ArgumentOutOfRangeError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\ArgumentOutOfRangeError.js",
      "rxjs/util/EmptyError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\EmptyError.js",
      "rxjs/util/FastMap": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\FastMap.js",
      "rxjs/util/Immediate": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\Immediate.js",
      "rxjs/util/Map": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\Map.js",
      "rxjs/util/MapPolyfill": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\MapPolyfill.js",
      "rxjs/util/ObjectUnsubscribedError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\ObjectUnsubscribedError.js",
      "rxjs/util/Set": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\Set.js",
      "rxjs/util/TimeoutError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\TimeoutError.js",
      "rxjs/util/UnsubscriptionError": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\UnsubscriptionError.js",
      "rxjs/util/applyMixins": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\applyMixins.js",
      "rxjs/util/assign": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\assign.js",
      "rxjs/util/errorObject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\errorObject.js",
      "rxjs/util/identity": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\identity.js",
      "rxjs/util/isArray": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isArray.js",
      "rxjs/util/isArrayLike": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isArrayLike.js",
      "rxjs/util/isDate": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isDate.js",
      "rxjs/util/isFunction": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isFunction.js",
      "rxjs/util/isNumeric": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isNumeric.js",
      "rxjs/util/isObject": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isObject.js",
      "rxjs/util/isPromise": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isPromise.js",
      "rxjs/util/isScheduler": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\isScheduler.js",
      "rxjs/util/noop": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\noop.js",
      "rxjs/util/not": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\not.js",
      "rxjs/util/pipe": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\pipe.js",
      "rxjs/util/root": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\root.js",
      "rxjs/util/subscribeToResult": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\subscribeToResult.js",
      "rxjs/util/toSubscriber": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\toSubscriber.js",
      "rxjs/util/tryCatch": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\util\\tryCatch.js",
      "rxjs/operators": "D:\\homework\\angular\\angular-1-2-lesson\\first-project\\node_modules\\rxjs\\_esm5\\operators\\index.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src\\main.ts"
    ],
    "polyfills": [
      "./src\\polyfills.ts"
    ],
    "styles": [
      "./src\\styles.css"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src\\index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "sourceMap": true,
      "tsConfigPath": "src\\tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
