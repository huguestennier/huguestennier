---
layout: layout.liquid
templateEngineOverride: md
---

# Related posts with <br>Hugo + Netlify CMS

<time>May 2nd, 2020</time>

A good way to keep your users engaged is showing links to other relevant related content. It will keep your users longer on your website…

## Good: Automatic related posts with Hugo’s Related content built-in methods
Hugo provide a [.Related](https://gohugo.io/content-management/related/) method you can use to automatically show related posts to your blog article.

From their docs: 
> Hugo uses a set of factors to identify a page’s related content based on Front Matter parameters.

## Better: Manually choosing your related posts with Netlify CMS
Automation is great but when your blog gets bigger and bigger, most of the time you will want to choose your own related posts that are the most relevant to your blog article. Some nuance that the automatic algorithm might not pick up or a posts your specifically want to resurface.

### Netlify CMS relation widget

[Netlify CMS relation widget](https://www.netlifycms.org/docs/widgets/relation/) can do exactly what we want. From the docs: 

> The relation widget allows you to reference items from another collection.

We can setup the relation widget to search for different fields in your content files. Here’s a sample config using `title` as the search field and searching into my `blog` collection:


config.yml
```yml
- label: “Related posts”
  name: “relatedposts”
  widget: “relation”
  collection: “blog”
  searchFields: [“title”]
  valueField: “title”
  multiple: true
```

Here’s how it would look in the UI:

From there, in our Hugo template, we can loop over our related posts array: 

```go
{{ if .Params.relatedposts }}
  {{ range .Params.relatedposts }}
    {{ $title := . }}
    {{ range where $.Site.Pages “Title” $title }}
      <!— Inside the range, we have access to every posts .Params —->
        <article class=“related-post”>
          <a href=“{{ .Permalink }}”>{{ .Title }}</a>
      by {{ .Params.author }} on {{ .Params.date }}
      <p>{{ . Description }}</p>
        </article>
    {{ end }}
  {{ end }}
{{ end }}
```

## Best: Why not both?
Sometime you just want to write a quick article and not worry too much about related posts or you just want to resurface one post in particular. We can combine both Hugo’s .Related and Netlify CMS relation widget using `.Scratch` to cover all different cases: 

```go
<!— This variable will hold our related posts —>
{{ $related := newScratch }}

<!— 1. Check if related posts are set through the CMS —>
{{ if .Params.relatedposts }}
  {{ range .Params.relatedposts }}
    {{ $title := . }}
    {{ range where $.Site.Pages “Title” $title }}
      <!— We use `slice` in order to create an array of posts —->
      {{ $related.Add “posts” (slice .) }}
    {{ end }}
  {{ end }}
{{ end }}

<!— 2. Use Hugo’s built-in method .Related  —>
{{ $related.Add “posts” (.Site.RegularPages.Related . | first 2) }}

<!— We’re using `first 2` filter here just in case that our related posts array contains more posts than what we want to show in our UI. We can safely assume it will always only show two posts. —> 
{{ with $related.Get “posts” | first 2 }}
  <h2>Related posts</h2>
    {{ range . }}
      <article class=“related-post”>
          <a href=“{{ .Permalink }}”>{{ .Title }}</a>
      by {{ .Params.author }} on {{ .Params.date }}
      <p>{{ . Description }}</p>
        </article>
    {{ end }}
{{ end }}
```

If you write content using Hugo and Netlify CMS, this is a great way to resurface related posts and keep your user engaged.