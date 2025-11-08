const DEVTO_API = 'https://dev.to/api';

export interface DevtoUserArticle {
	id: number;
	title: string;
	description: string;
	published_at: string;
	cover_image: string | null;
	tag_list: string[] | string;
	public_reactions_count: number;
	comments_count: number;
	user: {
		name: string;
		profile_image: string;
	};
}

export interface DevtoArticleDetail extends DevtoUserArticle {
	body_html: string;
	body_markdown: string;
}

export async function fetchUserArticles(username: string, perPage = 5, page = 1): Promise<DevtoUserArticle[]> {
	const url = `${DEVTO_API}/articles?username=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch DEV.to articles: ${res.status}`);
	return res.json();
}

export async function fetchArticleById(id: string | number): Promise<DevtoArticleDetail> {
	const url = `${DEVTO_API}/articles/${id}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch DEV.to article ${id}: ${res.status}`);
	return res.json();
}

export async function fetchArticlesByTag(tag: string, perPage = 5, page = 1): Promise<DevtoUserArticle[]> {
	const url = `${DEVTO_API}/articles?tag=${encodeURIComponent(tag)}&per_page=${perPage}&page=${page}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch DEV.to tag ${tag}: ${res.status}`);
	return res.json();
}


