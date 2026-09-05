import React, { useState, useEffect } from 'react';
import { commentService, CommentItem } from '../services/commentService';
import { Button } from '../components/ui/Button';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  Clock,
  Radio,
  CornerDownRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  User,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_COMMENT_LIMIT = 4;

  const fetchComments = async () => {
    setIsLoading(true);
    setFeedbackError(null);
    try {
      const res = await commentService.getComments();
      if (res.success) {
        setComments(res.data);
      } else {
        setFeedbackError(res.error || 'Comments are temporarily unavailable.');
      }
    } catch (err: any) {
      setFeedbackError(err.message || 'Comments are temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    setFeedbackError(null);
    setSuccessNotice(null);

    try {
      const res = await commentService.postComment(name, commentText);
      if (res.success) {
        setName('');
        setCommentText('');
        setSuccessNotice('Transmission logged & published to public telemetry board!');
        setTimeout(() => setSuccessNotice(null), 5000);
        await fetchComments();
      } else {
        setFeedbackError(res.error || 'Failed to submit transmission. Please verify connection.');
      }
    } catch (err: any) {
      setFeedbackError(err.message || 'Transmission transmission error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleComments = isExpanded ? comments : comments.slice(0, INITIAL_COMMENT_LIMIT);
  const hasMoreComments = comments.length > INITIAL_COMMENT_LIMIT;
  const remainingCount = comments.length - INITIAL_COMMENT_LIMIT;

  return (
    <section
      id="comments"
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-hud-card/30 border-t border-hud-border relative"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span>06 // COMMUNITY FEEDBACK &bull; PUBLIC TRANSMISSION LOGS</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            COMMUNITY TRANSMISSIONS &amp; REVIEWS
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Comment Submission Form */}
          <div className="lg:col-span-5 bg-hud-card border border-hud-border-bright p-5 sm:p-6 rounded-sm shadow-xl hud-corner space-y-4">
            <div className="pb-3 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-wider font-bold">
                <Radio className="w-4 h-4 text-hud-green animate-pulse" />
                <span>LEAVE A PUBLIC COMMENT / FEEDBACK</span>
              </div>
              <span className="text-[10px] font-mono text-hud-muted">DIRECT BROADCAST</span>
            </div>

            <p className="text-xs text-hud-slate font-sans leading-relaxed">
              Have thoughts on my robotics projects, technical questions, or collaboration feedback? Leave a public transmission below.
            </p>

            {/* Notification Messages */}
            {successNotice && (
              <div className="p-3 bg-hud-green/10 border border-hud-green/50 text-hud-green rounded-sm flex items-center gap-2 font-mono text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            {feedbackError && (
              <div className="p-3 bg-hud-red/10 border border-hud-red/50 text-hud-red rounded-sm flex items-center gap-2 font-mono text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{feedbackError}</span>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  YOUR NAME / CALLSIGN *
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex (Engineering Lead) / Recruiter / Peer"
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  TRANSMISSION MESSAGE / COMMENT *
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={2000}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type your feedback, review, project inquiry, or recommendation..."
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green resize-y"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[10px] text-hud-muted">
                  * Instant public transmission to cloud repository
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting || !name.trim() || !commentText.trim()}
                  icon={<Send className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'BROADCASTING...' : 'POST COMMENT'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Public Comments Feed & Admin Replies Stream */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-hud-border">
              <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase font-bold tracking-wider">
                <MessageSquare className="w-4 h-4 text-hud-cyan" />
                <span>RECORDED TRANSMISSIONS ({comments.length})</span>
              </div>
              <button
                onClick={fetchComments}
                disabled={isLoading}
                className="p-1 hover:bg-hud-panel text-hud-muted hover:text-hud-green rounded-sm transition-colors text-xs font-mono flex items-center gap-1"
                title="Refresh comments stream"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-hud-green' : ''}`} />
                <span className="text-[10px]">SYNC</span>
              </button>
            </div>

            {isLoading && comments.length === 0 ? (
              <div className="p-12 text-center text-hud-muted font-mono text-xs space-y-2 bg-hud-card border border-hud-border rounded-sm">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-hud-green mb-2" />
                <span>CONNECTING TO CLOUD TELEMETRY REPOSITORY...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="p-8 text-center text-hud-muted font-mono text-xs bg-hud-card border border-hud-border rounded-sm space-y-2">
                <Radio className="w-8 h-8 mx-auto text-hud-muted opacity-40 mb-1" />
                <p className="text-hud-slate">No public transmissions recorded yet.</p>
                <p className="text-[11px] text-hud-muted">Be the first to transmit a comment or project review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4 transition-all duration-300">
                  {visibleComments.map((item) => (
                    <div
                      key={item.id}
                      className="bg-hud-card border border-hud-border rounded-sm p-4 sm:p-5 space-y-3 font-mono text-xs relative hud-corner hover:border-hud-border-bright transition-colors"
                    >
                      {/* Visitor Comment Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-hud-border pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-hud-panel border border-hud-cyan/40 flex items-center justify-center text-hud-cyan font-bold text-[10px]">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-hud-bright tracking-wide">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-hud-muted">
                              VISITOR TRANSMISSION
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] text-hud-muted flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3 text-hud-muted" />
                          <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Visitor Comment Body */}
                      <p className="text-hud-slate font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        {item.comment}
                      </p>

                      {/* Nested Admin / Operator Replies */}
                      {item.replies && item.replies.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-hud-border/60 space-y-3">
                          {item.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-3 bg-hud-panel border-l-2 border-hud-green rounded-r-sm space-y-1.5 ml-2 sm:ml-4"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-hud-green uppercase tracking-wider">
                                  <ShieldCheck className="w-3.5 h-3.5 text-hud-green" />
                                  <span>{reply.name} [OPERATOR / ADMIN]</span>
                                </div>
                                <span className="text-[9px] text-hud-muted font-mono">
                                  {new Date(reply.created_at).toLocaleDateString()}
                                </span>
                              </div>

                              <p className="text-xs font-sans text-hud-bright leading-relaxed pl-1 whitespace-pre-wrap">
                                {reply.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                {/* See More / Show Less Toggle (Only when total comments > 4) */}
                {hasMoreComments && (
                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-hud-panel hover:bg-hud-card border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green font-mono text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm active:scale-95 group"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 text-hud-green group-hover:-translate-y-0.5 transition-transform" />
                          <span>[ SHOW LESS TRANSMISSIONS ]</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 text-hud-green group-hover:translate-y-0.5 transition-transform" />
                          <span>[ SEE MORE TRANSMISSIONS (+{remainingCount}) ]</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

