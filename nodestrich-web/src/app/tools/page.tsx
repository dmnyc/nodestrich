export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#f800c1]">Node Runner Tools</h1>
      <p className="text-gray-300 mb-8">
        Essential tools and utilities for Lightning Network node operations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Setup Tools</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Node configuration generator</li>
            <li>• Channel opening calculator</li>
            <li>• Fee optimization guide</li>
            <li>• Backup verification tools</li>
          </ul>
        </div>

        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Monitoring</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Channel health checker</li>
            <li>• Routing performance tracker</li>
            <li>• Liquidity analysis tools</li>
            <li>• Alert configuration guides</li>
          </ul>
        </div>

        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Maintenance</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Channel rebalancing strategies</li>
            <li>• Force close recovery</li>
            <li>• Database maintenance</li>
            <li>• Update procedures</li>
          </ul>
        </div>

        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">External Resources</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• <a href="https://amboss.space" className="text-[#f800c1] hover:underline">Amboss Space</a> - Network explorer</li>
            <li>• <a href="https://1ml.com" className="text-[#f800c1] hover:underline">1ML</a> - Node statistics</li>
            <li>• <a href="https://lightningnetwork.plus" className="text-[#f800c1] hover:underline">LN+</a> - Channel swaps</li>
            <li>• <a href="https://terminal.lightning.engineering" className="text-[#f800c1] hover:underline">Lightning Terminal</a> - Node management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}