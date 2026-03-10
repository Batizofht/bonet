"use client"
import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Check, Share2 } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
  description: string
  imageUrl?: string
  hashtags?: string[]
  className?: string
}

export default function SocialShare({ 
  url, 
  title, 
  description, 
  imageUrl, 
  hashtags = ["Rwanda", "Travel", "Business", "Investment", "BonetElite"],
  className = "" 
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Advanced Open Graph URL generation
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedHashtags = hashtags.join(',')
  const encodedImage = imageUrl ? encodeURIComponent(imageUrl) : ''

  // Social platform URLs with advanced parameters
  const socialUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}&hashtag=%23RwandaTravel`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=BonetElite&hashtags=${encodedHashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}&source=BonetEliteServices`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: keyof typeof socialUrls) => {
    // Track social share for advanced analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'share', {
        method: platform,
        content_type: 'blog_post',
        item_id: title,
        content_title: title,
        content_url: url,
        platform: platform,
        timestamp: new Date().toISOString()
      });
      
      // Enhanced e-commerce style tracking
      gtag('event', 'social_share', {
        event_category: 'engagement',
        event_label: platform,
        value: 1,
        content_type: 'blog_post',
        content_id: title,
        platform: platform
      });
    }
    
    // Facebook Pixel tracking (if available)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Share', {
        content_type: 'blog_post',
        content_title: title,
        content_url: url
      });
    }
    
    // LinkedIn Insight tracking (if available)
    if (typeof lintrk !== 'undefined') {
      lintrk('track', 'conversion', { 
        conversion_id: 123456789, 
        currency: 'USD', 
        value: 1.0 
      });
    }
    
    window.open(socialUrls[platform], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  }

  const SocialButton = ({ platform, icon: Icon, label }: { 
    platform: keyof typeof socialUrls
    icon: React.ElementType
    label: string 
  }) => (
    <button
      onClick={() => handleShare(platform)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
        platform === 'facebook' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
        platform === 'twitter' ? 'bg-sky-500 hover:bg-sky-600 text-white' :
        platform === 'linkedin' ? 'bg-blue-700 hover:bg-blue-800 text-white' :
        platform === 'whatsapp' ? 'bg-green-500 hover:bg-green-600 text-white' :
        platform === 'telegram' ? 'bg-blue-400 hover:bg-blue-500 text-white' :
        platform === 'reddit' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
        platform === 'email' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
        'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      title={`Share on ${label}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )

  return (
    <div className={`social-share-container ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setShowShareModal(!showShareModal)}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share Article</span>
      </button>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share this article</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Article Preview */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-start gap-4">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                <p className="text-xs text-blue-600 mt-2 truncate">{url}</p>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <SocialButton platform="facebook" icon={Facebook} label="Facebook" />
              <SocialButton platform="twitter" icon={Twitter} label="Twitter" />
              <SocialButton platform="linkedin" icon={Linkedin} label="LinkedIn" />
              <SocialButton platform="whatsapp" icon={MessageCircle} label="WhatsApp" />
              <SocialButton platform="telegram" icon={MessageCircle} label="Telegram" />
              <SocialButton platform="reddit" icon={MessageCircle} label="Reddit" />
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={handleCopyLink}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  copied 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Advanced Options */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                <p>Share with your network and help others discover this content</p>
                <p className="mt-1">Hashtags: {hashtags.map(tag => `#${tag}`).join(' ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
