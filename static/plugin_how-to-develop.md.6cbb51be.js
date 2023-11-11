import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.72cf09dc.js";const p="/static/freesound.1f395308.png",o="/static/freesound1.dd0e71d1.png",e="/static/freesound2.c0282123.png",t="/static/freesound3.2b4b001d.png",c="/static/freesound4.58054b21.png",r="/static/freesound5.ae8460c6.png",E="/static/freesound6.68a093db.png",y="/static/freesound7.e47fa8f8.png",i="/static/freesound8.5b11770e.png",f=JSON.parse('{"title":"举个栗子","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"plugin/how-to-develop.md","filePath":"plugin/how-to-develop.md","lastUpdated":1699699609000}'),F={name:"plugin/how-to-develop.md"},u=l('<h1 id="举个栗子" tabindex="-1">举个栗子 <a class="header-anchor" href="#举个栗子" aria-label="Permalink to &quot;举个栗子&quot;">​</a></h1><h2 id="开发方式" tabindex="-1">开发方式 <a class="header-anchor" href="#开发方式" aria-label="Permalink to &quot;开发方式&quot;">​</a></h2><p>为了在 <code>app</code> 内使用特定功能，我们需要按照插件协议实现插件定义的函数。实现这些函数通常有 <code>3</code> 种方式。</p><p>第一种是不涉及网络请求的情况，直接按照一些特定逻辑进行拼接转化为插件可以识别的格式即可。</p><p>第二种是直接请求接口，比如可以自己开启一个用于提供音乐服务的 <code>web server</code>，然后便可以通过插件中的 <code>axios</code> 库进行网络请求，并将结果转化为插件可以识别的格式。</p><p>第三种是类似于爬虫的原理，先发起网络请求，获取原本的 <code>html</code> 文件，然后再用 <code>cheerio</code> 对 <code>html</code> 进行解析，得到目标内容，并做进一步处理，转化为插件可以识别的格式。</p><h2 id="插件示例" tabindex="-1">插件示例 <a class="header-anchor" href="#插件示例" aria-label="Permalink to &quot;插件示例&quot;">​</a></h2><p>我们以一个第三方音乐网站 <a href="https://freesound.org/" target="_blank" rel="noreferrer">freesound</a> 为例，做一个支持搜索、播放、导入单曲功能的插件。<code>freesound</code> 的页面如下图所示：</p><p><img src="'+p+'" alt="freesound"></p><p>我们搜索任意内容，即可看到搜索结果。搜索结果也可以在 <code>dom</code> 结构直接看到。搜索页面遵循如下规则：<code>https://freesound.org/search/?q=关键字</code>，我们直接解析 <code>dom</code> 结构即可拿到关于歌曲的完整信息。</p><p><img src="'+o+'" alt="freesound1"></p><p><img src="'+e+`" alt="freesound2"></p><p>根据上述分析，我们可以按照方式三开发。为了实现插件的搜索功能，我们可以参考 <a href="/plugin/protocol.html#搜索-search">插件协议的搜索函数</a> 来进行具体实现。</p><h3 id="步骤一-插件框架" tabindex="-1">步骤一：插件框架 <a class="header-anchor" href="#步骤一-插件框架" aria-label="Permalink to &quot;步骤一：插件框架&quot;">​</a></h3><p>我们先来定义一下插件的大概结构：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  platform: </span><span style="color:#9ECBFF;">&quot;FreeSound&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#E1E4E8;">  version: </span><span style="color:#9ECBFF;">&quot;0.0.0&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">  cacheControl: </span><span style="color:#9ECBFF;">&quot;no-store&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">page</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">type</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// TODO: 在这里实现搜索函数的功能</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  platform: </span><span style="color:#032F62;">&quot;FreeSound&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#24292E;">  version: </span><span style="color:#032F62;">&quot;0.0.0&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#24292E;">  cacheControl: </span><span style="color:#032F62;">&quot;no-store&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(</span><span style="color:#E36209;">query</span><span style="color:#24292E;">, </span><span style="color:#E36209;">page</span><span style="color:#24292E;">, </span><span style="color:#E36209;">type</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// TODO: 在这里实现搜索函数的功能</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h3 id="步骤二-实现搜索函数" tabindex="-1">步骤二：实现搜索函数 <a class="header-anchor" href="#步骤二-实现搜索函数" aria-label="Permalink to &quot;步骤二：实现搜索函数&quot;">​</a></h3><p>我们首先需要获取搜索页面对应的 <code>html</code> 文件。请求网络可以用 axios 库，这是一个前端很常用的网络请求库。</p><p>我们写出如下 search 函数，它首先能完成请求对应的网址：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">axios</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;axios&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  platform: </span><span style="color:#9ECBFF;">&quot;FreeSound&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#E1E4E8;">  version: </span><span style="color:#9ECBFF;">&quot;0.0.0&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">  cacheControl: </span><span style="color:#9ECBFF;">&quot;no-store&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">page</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">type</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;music&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 我们能搜索的只有音乐，因此判断下类型</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取网站的html</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rawHtml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> axios.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://freesound.org/search&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">          q: query,</span></span>
<span class="line"><span style="color:#E1E4E8;">          page,</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">      ).data;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// TODO: 接下来解析html</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">axios</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;axios&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  platform: </span><span style="color:#032F62;">&quot;FreeSound&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#24292E;">  version: </span><span style="color:#032F62;">&quot;0.0.0&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#24292E;">  cacheControl: </span><span style="color:#032F62;">&quot;no-store&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(</span><span style="color:#E36209;">query</span><span style="color:#24292E;">, </span><span style="color:#E36209;">page</span><span style="color:#24292E;">, </span><span style="color:#E36209;">type</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;music&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 我们能搜索的只有音乐，因此判断下类型</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取网站的html</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rawHtml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> axios.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://freesound.org/search&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">          q: query,</span></span>
<span class="line"><span style="color:#24292E;">          page,</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">      ).data;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// TODO: 接下来解析html</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>接下来我们需要解析 <code>html</code> 文件，并把它转化为插件可以识别的 <code>IMusicItem</code> 类型。解析 <code>html</code> 可以使用 <code>cheerio</code> 库，它可以用类似 jquery 的语法快速解析 html 元素。根据 <code>dom</code> 结构，我们写出如下代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">axios</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;axios&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cheerio</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;cheerio&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    platform: </span><span style="color:#9ECBFF;">&quot;FreeSound&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#E1E4E8;">    version: </span><span style="color:#9ECBFF;">&quot;0.0.0&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">    cacheControl: </span><span style="color:#9ECBFF;">&quot;no-store&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">page</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">type</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;music&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 我们能搜索的只有音乐，因此判断下类型</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 获取网站的html</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rawHtml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> axios.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://freesound.org/search&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    q: query,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    page,</span></span>
<span class="line"><span style="color:#E1E4E8;">                })</span></span>
<span class="line"><span style="color:#E1E4E8;">            ).data;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 接下来解析html </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cheerio.</span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">(rawHtml);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 存储搜索结果 </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">searchResults</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 获取所有的结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resultElements</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.bw-search__result&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 解析每一个结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            resultElements.</span><span style="color:#B392F0;">each</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">element</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">playerElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(element).</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.bw-player&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// id</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">id</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> playerElement.</span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sound-id&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 音频名</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">title</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> playerElement.</span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;title&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 作者</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">artist</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(element).</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.col-12.col-lg-12.middle a&#39;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">text</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 专辑封面</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">artwork</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> playerElement.</span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;waveform&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 音源</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> playerElement.</span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mp3&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 专辑名，这里就随便写个了，不写也没事</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">album</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;来自FreeSound的音频&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">                searchResults.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">// 一定要有一个 id 字段</span></span>
<span class="line"><span style="color:#E1E4E8;">                    id,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    title,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    artist,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    artwork,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    album,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    url</span></span>
<span class="line"><span style="color:#E1E4E8;">                })</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                isEnd: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                data: searchResults</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">axios</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;axios&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cheerio</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;cheerio&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    platform: </span><span style="color:#032F62;">&quot;FreeSound&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 插件名</span></span>
<span class="line"><span style="color:#24292E;">    version: </span><span style="color:#032F62;">&quot;0.0.0&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 版本号</span></span>
<span class="line"><span style="color:#24292E;">    cacheControl: </span><span style="color:#032F62;">&quot;no-store&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(</span><span style="color:#E36209;">query</span><span style="color:#24292E;">, </span><span style="color:#E36209;">page</span><span style="color:#24292E;">, </span><span style="color:#E36209;">type</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;music&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 我们能搜索的只有音乐，因此判断下类型</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 获取网站的html</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rawHtml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> axios.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://freesound.org/search&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">                    q: query,</span></span>
<span class="line"><span style="color:#24292E;">                    page,</span></span>
<span class="line"><span style="color:#24292E;">                })</span></span>
<span class="line"><span style="color:#24292E;">            ).data;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 接下来解析html </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cheerio.</span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">(rawHtml);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 存储搜索结果 </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">searchResults</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 获取所有的结果</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resultElements</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.bw-search__result&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 解析每一个结果</span></span>
<span class="line"><span style="color:#24292E;">            resultElements.</span><span style="color:#6F42C1;">each</span><span style="color:#24292E;">((</span><span style="color:#E36209;">index</span><span style="color:#24292E;">, </span><span style="color:#E36209;">element</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">playerElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(element).</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.bw-player&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// id</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">id</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> playerElement.</span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sound-id&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 音频名</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">title</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> playerElement.</span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;title&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 作者</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">artist</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(element).</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.col-12.col-lg-12.middle a&#39;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">text</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 专辑封面</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">artwork</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> playerElement.</span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;waveform&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 音源</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">url</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> playerElement.</span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mp3&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 专辑名，这里就随便写个了，不写也没事</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">album</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;来自FreeSound的音频&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">                searchResults.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">// 一定要有一个 id 字段</span></span>
<span class="line"><span style="color:#24292E;">                    id,</span></span>
<span class="line"><span style="color:#24292E;">                    title,</span></span>
<span class="line"><span style="color:#24292E;">                    artist,</span></span>
<span class="line"><span style="color:#24292E;">                    artwork,</span></span>
<span class="line"><span style="color:#24292E;">                    album,</span></span>
<span class="line"><span style="color:#24292E;">                    url</span></span>
<span class="line"><span style="color:#24292E;">                })</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                isEnd: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                data: searchResults</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>此时，一个插件就开发完成了。上面的插件并没有判断是否还有下一页（返回的 <code>isEnd</code> 始终是 <code>true</code>），你也可以尝试完善一下，让插件拥有分页功能。</p><p>插件安装后，在 <code>PC</code> 版本上表现如下：</p><p><img src="`+t+'" alt="freesound3"></p><p>尝试搜索一下：</p><p><img src="'+c+'" alt="freesound4"></p><p><img src="'+r+'" alt="freesound5"></p><p>在 <code>安卓</code> 版本上表现如下：</p><p><img src="'+E+'" alt="freesound3"></p><p>尝试搜索一下：</p><p><img src="'+y+'" alt="freesound3"></p><p><img src="'+i+'" alt="freesound3"></p><h2 id="完整代码" tabindex="-1">完整代码 <a class="header-anchor" href="#完整代码" aria-label="Permalink to &quot;完整代码&quot;">​</a></h2><p>插件的完整代码在 <a href="https://github.com/maotoumao/MusicFreePlugins/blob/master/example/freesound.js" target="_blank" rel="noreferrer">Github</a> <a href="https://gitee.com/maotoumao/MusicFreePlugins/blob/master/example/freesound.js" target="_blank" rel="noreferrer">Gitee</a>。</p><p>你跟着上述步骤开发，并直接通过【安装本地插件】导入插件，也可以尝试从 URL 安装插件：<code>https://gitee.com/maotoumao/MusicFreePlugins/raw/master/example/freesound.js</code>。</p><h2 id="插件模板" tabindex="-1">插件模板 <a class="header-anchor" href="#插件模板" aria-label="Permalink to &quot;插件模板&quot;">​</a></h2><p>如果你觉得这种开发方式过于原始，MusicFree 也提供了插件开发模板：<a href="https://github.com/maotoumao/MusicFreePluginTemplate" target="_blank" rel="noreferrer">Github</a> <a href="https://gitee.com/maotoumao/MusicFreePluginTemplate" target="_blank" rel="noreferrer">Gitee</a> ，按照 Readme 使用即可。</p>',38),d=[u];function m(h,A,D,C,q,g){return n(),a("div",null,d)}const _=s(F,[["render",m]]);export{f as __pageData,_ as default};
