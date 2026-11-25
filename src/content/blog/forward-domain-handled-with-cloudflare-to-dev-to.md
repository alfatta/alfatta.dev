---
title: "Redirect a Blog Path to DEV.to with Cloudflare"
description: "Use a Cloudflare Single Redirect to send /blog and /blog/ to your DEV.to profile without redirecting your homepage or existing posts."
heroImageUrl: https://images.unsplash.com/photo-1544197150-b99a580bb7a8?fit=crop&w=800&h=418&fm=avif
imageThumbnail: https://images.unsplash.com/photo-1544197150-b99a580bb7a8?fit=crop&w=80&h=80&fm=avif
pubDate: "2020-05-31T11:59:10+07:00"
updatedDate: "2026-11-20"
---

When I moved my writing to DEV.to, I wanted visitors to my old `/blog` link to land on my DEV.to profile without moving the rest of my site. This post originally used a Cloudflare Page Rule. For a new setup, use a Single Redirect instead.

## Create a redirect for the blog landing page

The hostname you're redirecting from must have a [Cloudflare-proxied DNS record](https://developers.cloudflare.com/dns/proxy-status/). The rule below matches both `/blog` and `/blog/`, but not individual posts like `/blog/my-post/`. If you still publish a blog index on your site, use a dedicated path such as `/dev/` instead.

1. Open your site's **Rules → Overview** in Cloudflare and select **Create rule → Redirect Rule**.
2. Under **When incoming requests match**, choose **Custom filter expression**. Replace `example.com` with your hostname:

   ```text
   (http.host eq "example.com" and http.request.uri.path in {"/blog" "/blog/"})
   ```

3. Under **Then**, choose a **Static** redirect to `https://dev.to/your-handle`. Keep **Preserve query string** off unless you want to forward the original query parameters to DEV.to.
4. Select **302** while testing and deploy the rule. Switch to **301** once you've confirmed the redirect and intend it to be permanent.

## Check what redirects

```bash
curl -I https://example.com/blog
curl -I https://example.com/blog/
curl -I https://example.com/
```

The first two responses should have a `Location` header pointing to your DEV.to profile. The homepage and any existing article URLs should still go to your own site. If you're replacing a Page Rule, also check that the old rule isn't catching paths you want to keep.

See Cloudflare's [Single Redirects dashboard guide](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) and [Page Rules migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/).
