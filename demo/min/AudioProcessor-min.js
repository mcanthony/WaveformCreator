var AudioProcessor={bufferFile:function(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.responseType="arraybuffer",t.onload=function(){context.decodeAudioData(t.response,function(e){n(e)},f)};var f=function(){};t.send()},bufferFilter:function(e,n,t){var f=this;this.bufferFile(e,function(e){f.offlineFilter(e,n,t)})},offlineFilter:function(e,n,t){var f=n.type,r=n.frequency,o=n.q,i=new OfflineAudioContext(2,e.length,e.sampleRate),u=i.createBufferSource();u.buffer=e;var n=i.createBiquadFilter();n.type=f,n.frequency.value=r,n.Q.value=o,u.connect(n),n.connect(i.destination),u.start(0),i.startRendering(),i.oncomplete=function(e){var n=e.renderedBuffer;t(n)}},offlineFilters:function(e,n,t){var f=0,r=n.length,o=this,i=[],u=function(e,t,o){var u=n.indexOf(t);i[u]=e,f++,f===r&&o(i)};n.forEach(function(n){"none"===n?u(e,n,t):o.offlineFilter(e,n,function(e){u(e,n,t)})})}};