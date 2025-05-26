"use client";
import Link from "next/link";
import { useState } from "react";

export default function DevPage() {
  const [showBuilderInstructions, setShowBuilderInstructions] = useState(false);
  const [showFigmaAnalysis, setShowFigmaAnalysis] = useState(false);

  const builderInstructions = `Create a pixel-perfect mobile gift creation interface for iPhone 16 Pro (402px width) based on the provided Figma design. The interface should be a single scrollable page with two main sections:

EXACT SPECIFICATIONS:
- Container: 402px width, 874px height, gradient background from #050505 to #6B6B6B
- Font: Sequel Sans throughout
- Top padding: 184px, bottom padding: 88px
- Gap between sections: 442px

SECTION 1 - AMOUNT SELECTION:
- Header: "meet" (17px, #919191, 90% opacity) + "supa gift" (35px, white, lowercase)
- Width: 140px, centered
- Budget section: "set your budget" (17px, white, 90% opacity)
- Three SOL options: 0.2, 0.5, 0.7 SOL
- Each button: 229px × 66px, rounded 159px, gradient background #150515 to #431040
- Purple gradient border with inset glow shadow
- Solana logo: 54px circle with purple-blue gradient
- Text: 30px, 2% letter spacing
- Custom input: 229px × 67px, rounded 120px, white 30% opacity border
- Placeholder: "enter amount in usd" (20px, 60% opacity)

SECTION 2 - GIFT TYPE SELECTION:
- Header: "choose" (17px, #919191, 90% opacity) + "gift type" (35px, white, lowercase)
- Width: 134px, height: 72px, centered
- Horizontal scroll container: 355px width, 40px padding
- Four cards: 268px × 402px each, 23px gap
- Card background: #353535 with teal gradient border
- Card shadows: outer + inset white glow
- Image area: 220px × 220px, rounded 12px, gradient borders
- Card types:
  1. "just tokens" - blue/purple gradient image
  2. "uncontrolled stakes" - green/teal gradient image  
  3. "controlled stakes" - yellow/orange gradient image
  4. "nft's" - pink/purple gradient image
- Title text: 36px, center aligned
- Description text: 17px, center aligned, multiple lines

BEHAVIOR:
- Smooth vertical scrolling between sections
- Horizontal snap scrolling for gift type cards
- Selection states with white ring borders
- Auto-navigation to checkout after both selections
- Responsive touch interactions optimized for mobile

TECHNICAL REQUIREMENTS:
- Use CSS scroll-snap for card scrolling
- Implement proper gradient borders using CSS
- Add inset box shadows for depth
- Ensure 60fps smooth scrolling
- Optimize for iPhone 16 Pro viewport
- Include proper focus states for accessibility

The design should feel premium and modern with smooth animations and precise spacing matching the Figma prototype exactly.`;

  const figmaAnalysis = `FIGMA PROTOTYPE BEHAVIOR ANALYSIS:

COMPONENT STRUCTURE:
- Main Frame: "Iphone 16 pro" (402×874px)
- Component Set: "screen amount, type" with variants
- Variant 1: "screen=value input" (amount selection)
- Variant 2: "screen=gift_type" (gift type selection)

LAYOUT SPECIFICATIONS:
- Background: Linear gradient #050505 → #6B6B6B
- Overflow: Vertical scroll enabled
- Padding: 184px top, 88px bottom
- Section gap: 442px (creates natural scroll anchoring)

AMOUNT SELECTION BEHAVIOR:
- Three preset SOL amounts: 0.2, 0.5, 0.7
- Interactive selection with visual feedback
- Custom USD input field
- Gradient backgrounds with inset shadows
- Purple/blue color scheme

GIFT TYPE BEHAVIOR:
- Horizontal scroll container
- Four card types with distinct visual themes
- Snap scrolling between cards
- Selection states with border highlights
- Auto-advance to next step on selection

ANIMATION PROPERTIES:
- Smooth scroll transitions
- Hover/focus state changes
- Selection ring animations
- Card snap positioning
- Gradient border effects

RESPONSIVE DESIGN:
- Fixed 402px width (iPhone 16 Pro)
- Vertical scroll for main content
- Horizontal scroll for gift cards
- Touch-optimized interactions
- Safe area considerations

ACCESSIBILITY FEATURES:
- High contrast text
- Focus indicators
- Touch target sizing (44px minimum)
- Screen reader compatible structure
- Keyboard navigation support`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🛠️ Dev Tools & Design System</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/sender/amount" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">🎨 New Design</h3>
            <p className="text-sm opacity-90">View the updated amount & gift type selection page</p>
          </Link>
          
          <button 
            onClick={() => setShowBuilderInstructions(!showBuilderInstructions)}
            className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">📋 Builder.io Instructions</h3>
            <p className="text-sm opacity-90">Pixel-perfect implementation guide</p>
          </button>
          
          <button 
            onClick={() => setShowFigmaAnalysis(!showFigmaAnalysis)}
            className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">🔍 Figma Analysis</h3>
            <p className="text-sm opacity-90">Prototype behavior breakdown</p>
          </button>
        </div>

        {/* Console Functions */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🖥️ Console Functions</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="text-green-400">privyStatus()</div>
            <div className="text-gray-400 ml-4">Check Privy authentication status and user info</div>
            <div className="text-green-400">privyLogin()</div>
            <div className="text-gray-400 ml-4">Trigger Privy login flow</div>
            <div className="text-green-400">privyLogout()</div>
            <div className="text-gray-400 ml-4">Trigger Privy logout</div>
          </div>
        </div>

        {/* Builder.io Instructions */}
        {showBuilderInstructions && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">📋 Builder.io Instructions</h2>
              <button 
                onClick={() => copyToClipboard(builderInstructions)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Copy to Clipboard
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
              {builderInstructions}
            </pre>
            <div className="mt-4 p-4 bg-yellow-900 bg-opacity-50 rounded">
              <p className="text-yellow-200 text-sm">
                <strong>Usage:</strong> Copy the above text and paste it into the Builder.io console when prompted with 
                &quot;Describe how the design integrates into your codebase&quot;
              </p>
            </div>
          </div>
        )}

        {/* Figma Analysis */}
        {showFigmaAnalysis && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">🔍 Figma Prototype Analysis</h2>
              <button 
                onClick={() => copyToClipboard(figmaAnalysis)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
              >
                Copy Analysis
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
              {figmaAnalysis}
            </pre>
          </div>
        )}

        {/* Design Comparison */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">📊 Design Implementation Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-400">✅ Implemented</h3>
              <ul className="space-y-1 text-sm">
                <li>• Single scrollable page layout</li>
                <li>• Exact Figma dimensions (402px width)</li>
                <li>• Gradient background (#050505 → #6B6B6B)</li>
                <li>• Sequel Sans font integration</li>
                <li>• Amount selection with SOL options</li>
                <li>• Gift type cards with horizontal scroll</li>
                <li>• Proper spacing and padding</li>
                <li>• Hidden Privy status checker</li>
                <li>• Removed header as per Figma</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">🔄 Needs Refinement</h3>
              <ul className="space-y-1 text-sm">
                <li>• Gradient border implementations</li>
                <li>• Inset shadow effects</li>
                <li>• Snap scrolling for gift cards</li>
                <li>• Exact Solana logo rendering</li>
                <li>• Card image backgrounds</li>
                <li>• Selection state animations</li>
                <li>• Touch interaction optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}