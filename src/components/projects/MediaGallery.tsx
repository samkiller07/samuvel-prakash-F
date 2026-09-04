import React, { useState } from 'react';
import { ProjectMedia } from '../../types/project';
import { Image as ImageIcon, Eye, Maximize2, FileCode2, Video } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface MediaGalleryProps {
  media?: ProjectMedia[];
  projectTitle: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ media, projectTitle }) => {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);

  if (!media || media.length === 0) {
    return (
      <div className="p-4 bg-hud-panel border border-hud-border rounded-sm text-center text-xs font-mono text-hud-muted">
        [SYS.TELEMETRY] No additional schematic / media attachments registered for this module.
      </div>
    );
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'diagram':
      case 'schematic':
        return <FileCode2 className="w-4 h-4 text-hud-green" />;
      case 'video':
        return <Video className="w-4 h-4 text-hud-amber" />;
      default:
        return <ImageIcon className="w-4 h-4 text-hud-cyan" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {media.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => setSelectedMedia(item)}
            className="group relative bg-hud-panel border border-hud-border hover:border-hud-green/60 rounded-sm overflow-hidden cursor-pointer transition-all duration-200"
          >
            {/* Thumbnail container */}
            <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
              <img
                src={item.url}
                alt={item.caption || `${projectTitle} - Media Attachment ${idx + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="p-2 bg-hud-card border border-hud-green text-hud-green rounded-full shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/70 border border-hud-border text-[10px] font-mono text-hud-text rounded-sm uppercase flex items-center gap-1">
                {getMediaIcon(item.type)}
                <span>{item.type}</span>
              </div>
            </div>

            {/* Caption */}
            {item.caption && (
              <div className="p-2 text-[11px] font-mono text-hud-slate line-clamp-2 border-t border-hud-border bg-hud-card">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Media Zoom Modal */}
      {selectedMedia && (
        <Modal
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          title={`MEDIA PREVIEW // ${selectedMedia.type.toUpperCase()}`}
          systemTag="TELEMETRY.IMG"
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="rounded-sm overflow-hidden border border-hud-border bg-black flex items-center justify-center max-h-[65vh]">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.caption || 'Project visual spec'}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
            {selectedMedia.caption && (
              <div className="p-3 bg-hud-panel border border-hud-border text-xs font-mono text-hud-text">
                <span className="text-hud-green mr-2">&gt;</span>
                {selectedMedia.caption}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
