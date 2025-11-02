import * as React from 'react';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types';
import { ItemCard } from '../components/ItemCard';
import { Modal } from '../components/Modal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 10;

const DashboardPage: React.FC = () => {
  console.log('[DashboardPage] Rendering with state hooks setup');
  const { posts, isLoading, error, addPost } = usePosts();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  
  console.log('[DashboardPage] Current state:', { 
    postsCount: posts.length, 
    isLoading, 
    error,
    currentPage 
  });

  // 3. Local state for the "Add New Post" form
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  // Loading state for pagination
  const [isPageLoading, setIsPageLoading] = React.useState(false);
  const pageTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestPost = posts.length > 0 ? posts[0] : null;
  const listPosts = React.useMemo(() => (posts.length > 1 ? posts.slice(1) : []), [posts]);
  const latestSnippet = React.useMemo(() => {
    if (!latestPost) {
      return '';
    }
    return latestPost.body.length > 220 ? `${latestPost.body.slice(0, 220)}...` : latestPost.body;
  }, [latestPost]);

  const openCreateModal = React.useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const closeCreateModal = React.useCallback(() => {
    setIsCreateModalOpen(false);
    setTitle('');
    setBody('');
  }, []);

  // 4. Pagination Logic with loading simulation
  const paginatedPosts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return listPosts.slice(startIndex, endIndex);
  }, [listPosts, currentPage]);

  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(listPosts.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [listPosts.length, currentPage]);

  // Handle page change with loading state
  const handlePageChange = React.useCallback((page: number) => {
    if (pageTimerRef.current) {
      clearTimeout(pageTimerRef.current);
    }

    setIsPageLoading(true);
    pageTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsPageLoading(false);
    }, 500);
  }, []);

  React.useEffect(() => {
    return () => {
      if (pageTimerRef.current) {
        clearTimeout(pageTimerRef.current);
      }
    };
  }, []);

  // 5. Form submission handler (Requirement #3)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return; // Simple validation

    const formData = { title: title.trim(), body: body.trim() };
    if (!formData.title || !formData.body) {
      return;
    }

    addPost(formData);

    // Reset form and set page to 1 to see the new post
    setCurrentPage(1);
    setIsPageLoading(false);
    closeCreateModal();
  };

  // 6. Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="space-y-4">
                <div className="h-4 w-32 bg-slate-800 rounded-full animate-pulse"></div>
                <div className="h-14 w-72 md:w-96 bg-slate-800 rounded-2xl animate-pulse"></div>
                <div className="h-4 w-64 bg-slate-800 rounded-full animate-pulse"></div>
              </div>
              <div className="h-12 w-48 bg-emerald-800/70 rounded-full animate-pulse"></div>
            </div>
          </div>

          <section className="mb-12">
            <div className="h-80 rounded-3xl border border-slate-800 bg-slate-900/60 animate-pulse"></div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-40 bg-slate-800 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-emerald-800/70 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
                  <div className="h-6 w-3/4 bg-slate-800 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-800 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-slate-800 rounded-md"></div>
                    <div className="h-4 w-2/3 bg-slate-800 rounded-md"></div>
                  </div>
                  <div className="h-4 w-24 bg-emerald-800/70 rounded-full"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 7. Render the UI
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-emerald-300/90">Content Studio</p>
              <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
                Content
                <span className="block sm:inline sm:ml-3 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-base text-slate-400 sm:text-lg">
                Spotlight fresh stories, monitor your catalog, and publish new highlights - all from one immersive workspace.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 self-start lg:self-auto">
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                </svg>
                New Post
              </button>
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-left sm:flex">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Total Posts</p>
                  <p className="text-lg font-semibold text-slate-200">{posts.length}</p>
                </div>
                <span className="h-8 w-px bg-slate-700" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Current Page</p>
                  <p className="text-lg font-semibold text-slate-200">{currentPage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-14">
          {latestPost ? (
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-900/20 p-8 sm:p-10 shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-24 -right-32 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl" />
              <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                    Latest Feature
                  </span>
                  <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl lg:text-5xl">
                    {latestPost.title}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                    {latestSnippet}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(latestPost)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      Read full story
                    </button>
                    <button
                      type="button"
                      onClick={openCreateModal}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-emerald-400 hover:text-emerald-200"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                      </svg>
                      Share update
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h12" />
                      </svg>
                      Content ID #{latestPost.id}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12m-3 6h3" />
                      </svg>
                      {posts.length} stories curated
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-6 rounded-2xl border border-emerald-500/20 bg-slate-900/40 p-6 text-slate-300">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-emerald-200">Spotlight</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Crafted with vision, this highlight blends culture, tech, and community impact for your audience.
                    </p>
                  </div>
                  <div className="grid gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      Freshly updated moments ago
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                      Tap to open the deep dive modal
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                      Share new perspectives anytime
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center text-slate-300">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-600 bg-slate-800">
                <svg className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-100">No stories yet</h2>
              <p className="mt-2 text-sm text-slate-400">Kick things off by publishing your first post.</p>
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                </svg>
                Create your first post
              </button>
            </div>
          )}
        </section>

        {/* Posts List Section */}
        <section className="mb-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-200">
                <svg className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2" />
                </svg>
                All Stories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                  Browse every highlight in chronological order.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              {listPosts.length} stories
            </span>
          </div>
          
          {isPageLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-3/4 h-6 bg-slate-800 rounded-md animate-pulse"></div>
                    <div className="w-6 h-6 bg-slate-700 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-slate-800 rounded-md animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-slate-800 rounded-md animate-pulse"></div>
                    <div className="w-4/6 h-4 bg-slate-800 rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="w-16 h-5 bg-emerald-800/70 rounded-full animate-pulse"></div>
                    <div className="w-20 h-5 bg-emerald-800/70 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
                    onClick={() => setSelectedPost(post)}
                  >
                    <ItemCard post={post} onClick={() => setSelectedPost(post)} />
                  </div>
                ))}
              </div>
              
              {paginatedPosts.length === 0 && (
                <div className="text-center py-12 bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700">
                  <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-slate-300">No additional posts yet</h3>
                  <p className="mt-1 text-sm text-slate-400">Create a new highlight to grow your collection.</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Pagination Section */}
          {listPosts.length > ITEMS_PER_PAGE && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
                totalItems={listPosts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Modal for Post Details */}
        {selectedPost && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedPost(null)}
            title={selectedPost.title}
            children={
              <div className="space-y-6">
                {/* Author info */}
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {selectedPost.title.split('')[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">
                      Content Creator
                    </h4>
                    <p className="text-sm text-slate-400">
                      Content ID: #{selectedPost.id}
                    </p>
                  </div>
                </div>

                {/* Main content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-300 leading-relaxed">
                    {selectedPost.body.split('.').map((sentence, index) => (
                      sentence.trim() && (
                        <span key={index} className="block mb-4">
                          {sentence.trim() + '.'}
                        </span>
                      )
                    ))}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {['Featured', 'Trending'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        )}

        <Modal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          title="Create New Post"
          metadata={<span className="text-sm text-slate-400">Share a fresh perspective with your community.</span>}
          bodyClassName="space-y-6"
          footer={
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-500">Publishing adds your story to the very top of the dashboard instantly.</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-post-form"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Publish Story
                </button>
              </div>
            </div>
          }
          children={
            <form id="create-post-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="title" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h12" />
                    </svg>
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      maxLength={120}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-500"
                      placeholder="E.g. Lagos Tech Hub Attracts Global Investors"
                      required
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                      {title.trim().length}/120
                    </span>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="body" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    Content
                  </label>
                  <div className="relative">
                    <textarea
                      id="body"
                      maxLength={700}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={6}
                      className="block w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-500"
                      placeholder="Paint the full picture. What's happening? Who does it impact? Why does it matter?"
                      required
                    />
                    <span className="pointer-events-none absolute right-3 bottom-3 text-xs text-slate-500">
                      {body.trim().length}/700
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-400">
                Pro tip: Share authentic stories about food, fashion, tech, culture to keep the dashboard vibrant.
              </div>
            </form>
          }
        />
      </div>
    </div>
  );
};

export default DashboardPage;

