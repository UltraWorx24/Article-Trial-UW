document.addEventListener("DOMContentLoaded", () => {
  loadRelatedArticles();

  loadPopularArticles();
});

async function loadPopularArticles() {
  try {
    const response = await fetch("/UltraWorx/data/articles.json");
    const data = await response.json();

    // Filter only articles with popular: true
    const popular = data.articles.filter((article) => article.popular === true);

    renderPopularArticles(popular);
  } catch (error) {
    console.error("Error loading popular articles:", error);
  }
}

function renderPopularArticles(articles) {
  const container = document.querySelector(".popular-articles-container");
  container.textContent = "";

  articles.forEach((article) => {
    const box = document.createElement("a");
    box.className = "article-box";
    box.href = article.link;

    const coverDiv = document.createElement("div");
    coverDiv.className = "article-cover";

    const img = document.createElement("img");
    img.src = article.cover;
    img.width = 600;
    img.height = 400;
    img.alt = article.title;
    coverDiv.appendChild(img);

    const contentDiv = document.createElement("div");
    contentDiv.className = "article-box-content";

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const date = document.createElement("small");
    date.className = "article-date";
    date.textContent = article.date;

    box.appendChild(coverDiv);
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(date);

    box.appendChild(contentDiv);
    container.appendChild(box);
  });
}

async function loadRelatedArticles() {
  try {
    const response = await fetch("/UltraWorx/data/articles.json");
    const data = await response.json();
    const currentPath = window.location.pathname.split("/").pop();

    // Find the current article by link
    const currentArticle = data.articles.find(
      (article) => article.link === currentPath
    );
    if (!currentArticle || !currentArticle["related-articles"]) return;

    // Get related articles by ID
    const related = data.articles.filter((article) =>
      currentArticle["related-articles"].includes(article.id)
    );

    renderRelatedArticles(related);
  } catch (error) {
    console.error("Error loading related articles:", error);
  }
}

function renderRelatedArticles(articles) {
  const container = document.querySelector(".related-articles-container");
  container.textContent = "";

  if (articles.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No related articles found.";
    container.appendChild(message);
    return;
  }

  articles.forEach((article) => {
    const box = document.createElement("a");
    box.className = "article-box";
    box.href = article.link;

    const contentDiv = document.createElement("div");
    contentDiv.className = "article-box-content";

    const title = document.createElement("h4");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const date = document.createElement("small");
    date.className = "article-date";
    date.textContent = article.date;

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(date);

    box.appendChild(contentDiv);
    container.appendChild(box);
  });
}
