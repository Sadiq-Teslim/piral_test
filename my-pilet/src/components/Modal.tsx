import * as React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  metadata?: React.ReactNode | false;
  footer?: React.ReactNode;
  bodyClassName?: string;
}

/**
 * A generic, reusable Modal component.
 * It handles its own visibility based on the 'isOpen' prop and provides a
 * styled container and a close button.
 */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, metadata, footer, bodyClassName }) => {
  if (!isOpen) {
    return null;
  }

  // Handle clicks on the backdrop to close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 backdrop-blur-xl p-4 sm:p-6 lg:p-8"
        onClick={handleBackdropClick}>
  <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/90 shadow-2xl shadow-emerald-500/10 transition-all duration-200 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]">
          <div className="absolute -top-16 -left-20 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 opacity-10 blur-3xl" />

          <div className="relative border-b border-slate-800/70 px-5 py-4 sm:px-8 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 pr-2 sm:pr-10">
                <h2 className="text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 sm:text-3xl">
                  {title}
                </h2>
                {metadata !== false && (
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
                    {metadata ?? (
                      <>
                        <span>Nigerian Content</span>
                        <span className="text-slate-600">•</span>
                        <span>
                          {new Date().toLocaleDateString('en-NG', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button
                type="button"
                aria-label="Close modal"
                title="Close modal"
                className="group rounded-full p-2 transition hover:bg-slate-800/80"
                onClick={onClose}>
                <svg
                  className="h-6 w-6 text-slate-500 transition group-hover:text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            <div className={bodyClassName ?? 'prose prose-invert prose-lg max-w-none prose-headings:text-slate-200 prose-p:text-slate-300'}>
              {children}
            </div>
          </div>

          <div className="relative border-t border-slate-800/70 bg-slate-900/60 px-5 py-4 sm:px-8 sm:py-5">
            {footer ?? (
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:ring-offset-2 focus:ring-offset-slate-900">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
