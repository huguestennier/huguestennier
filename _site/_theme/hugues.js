/*
  1. Get all the headers
  2. Append a link beside them in absolute pos
  3. get the id n shit
*/

/* function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const headers = document.querySelectorAll('h2, h3, h4, h5, h6');

headers.forEach(header => {

  const link = document.createElement("a");
  const slug = slugify(header.innerText);
  header.setAttribute("id", slug);
  link.setAttribute("href", `#${slug}`);
  link.setAttribute("class", "articles-header-link")
  link.innerText = "#";
  console.log(slugify(header.innerText));
  header.prepend(link);
}); */
