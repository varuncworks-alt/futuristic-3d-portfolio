import React, { useState, useEffect } from 'react';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  RefreshCw, 
  Code2, 
  UserCheck, 
  Terminal 
} from 'lucide-react';
import { Github } from './BrandIcons';
import { fetchGitHubUserData } from '../../utils/githubApi';
import { playHoverSound, playTerminalKey } from '../../utils/audioSynth';

export default function GitHubTelemetry() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    playTerminalKey();
    const res = await fetchGitHubUserData('varun01234');
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Github className="station-title-icon cyan" size={24} />
          <h2 className="station-title">Live GitHub Telemetry Radar</h2>
        </div>
        <p className="station-subtitle">
          Real-time feed connected directly to GitHub's public API querying public repositories, language distribution, and commit history for @varun01234.
        </p>
      </div>

      {/* Top Profile Summary Bar */}
      {data && (
        <div className="github-profile-card holo-border">
          <div className="profile-left">
            <img
              src={data.user.avatar}
              alt={data.user.name}
              className="github-avatar"
            />
            <div className="profile-info">
              <div className="profile-name-row">
                <h3 className="profile-name">{data.user.name}</h3>
                <span className="profile-login">@{data.user.login}</span>
              </div>
              <p className="profile-bio">
                {data.user.bio || "Python Developer & Software Engineer | Data Science, Mobile Apps & Enterprise Systems."}
              </p>
            </div>
          </div>

          <div className="profile-stats-row">
            <div className="stat-box">
              <span className="stat-label">Public Repos</span>
              <span className="stat-number cyan">{data.user.publicRepos}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Followers</span>
              <span className="stat-number purple">{data.user.followers}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Total Stars</span>
              <span className="stat-number emerald">{data.stats.totalStars}</span>
            </div>
            <button
              className="refresh-btn"
              onClick={loadData}
              disabled={loading}
              title="Refresh Live Telemetry"
            >
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Language Breakdown */}
      {data && data.stats.languages.length > 0 && (
        <div className="languages-breakdown-card">
          <div className="breakdown-title">
            <Code2 size={16} className="cyan" />
            <span>Top Codebase Languages</span>
          </div>
          <div className="lang-pills">
            {data.stats.languages.map(([lang, count]) => (
              <div key={lang} className="lang-pill" onMouseEnter={playHoverSound}>
                <span className="lang-name">{lang}</span>
                <span className="lang-count">{count} repos</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Repositories Grid */}
      {data && (
        <div className="repos-grid">
          {data.featuredRepos.map((repo, i) => (
            <div key={i} className="repo-card" onMouseEnter={playHoverSound}>
              <div className="repo-top">
                <span className="repo-name">{repo.name}</span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="repo-desc">
                {repo.description || "Public software engineering repository and source code implementation."}
              </p>

              <div className="repo-footer">
                <span className="repo-lang">{repo.language || 'Python'}</span>
                <div className="repo-stars">
                  <Star size={13} className="yellow" />
                  <span>{repo.stargazers_count || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
