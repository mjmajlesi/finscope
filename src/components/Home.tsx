import { Link } from 'react-router';

export default function Home() {
  return <Link to="/dashboard" className="block text-center py-12 hover:text-brand transition-colors">
    <h1 className="text-4xl font-bold mb-4">FinScope Dashboard</h1>
    <p className="text-text-muted">Click to view the financial dashboard</p>
  </Link>;
}