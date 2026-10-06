// Fetch live public data for varun01234
export async function fetchGitHubUserData(username = 'varun01234') {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('GitHub API rate limited or unavailable');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Calculate language breakdown
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    return {
      success: true,
      user: {
        login: user.login,
        name: user.name || "Varun Chaturvedi",
        avatar: user.avatar_url,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        createdAt: user.created_at,
        url: user.html_url
      },
      stats: {
        totalStars,
        totalForks,
        languages: Object.entries(languages).sort((a, b) => b[1] - a[1])
      },
      featuredRepos: repos.slice(0, 8)
    };
  } catch (err) {
    console.warn("Falling back to local cached GitHub profile data:", err.message);
    return {
      success: false,
      user: {
        login: username,
        name: "Varun Chaturvedi",
        avatar: "https://avatars.githubusercontent.com/u/108065221?v=4",
        publicRepos: 18,
        followers: 12,
        url: `https://github.com/${username}`
      },
      stats: {
        totalStars: 5,
        totalForks: 2,
        languages: [
          ["Python", 11],
          ["Jupyter Notebook", 4],
          ["HTML / JavaScript", 3]
        ]
      },
      featuredRepos: [
        {
          name: "CryptoClustering",
          html_url: `https://github.com/${username}/CryptoClustering`,
          description: "Unsupervised machine learning cryptocurrency clustering with PCA & K-Means.",
          language: "Jupyter Notebook",
          stargazers_count: 1
        },
        {
          name: "GPI-Info-Retrieval-",
          html_url: `https://github.com/${username}/GPI-Info-Retrieval-`,
          description: "OpenAI GPT-3.5 corporate intelligence and board of directors retrieval script.",
          language: "Jupyter Notebook",
          stargazers_count: 0
        },
        {
          name: "Link-Extraction-Tool-",
          html_url: `https://github.com/${username}/Link-Extraction-Tool-`,
          description: "Python automated Google search intelligence and competitor link scraper.",
          language: "Jupyter Notebook",
          stargazers_count: 0
        },
        {
          name: "Margin-Calculator",
          html_url: `https://github.com/${username}/Margin-Calculator`,
          description: "Precision financial margin and arbitrage calculation web engine.",
          language: "HTML",
          stargazers_count: 1
        },
        {
          name: "Python-Extraction-Tool-Using-Tesseract-OCR",
          html_url: `https://github.com/${username}/Python-Extraction-Tool-Using-Tesseract-OCR`,
          description: "Optical Character Recognition (OCR) pipeline transforming documents into structured records.",
          language: "Jupyter Notebook",
          stargazers_count: 1
        },
        {
          name: "Django-Project",
          html_url: `https://github.com/${username}/Django-Project`,
          description: "Enterprise backend service repository with Django REST framework and AWS integration.",
          language: "Python",
          stargazers_count: 1
        }
      ]
    };
  }
}
