export const getPosts = async (lazyState) => { 
  try {
    const queryParams = new URLSearchParams({
      cursor: lazyState?.cursor || "",
      direction: lazyState?.direction || "next",
      limit: lazyState?.limit?.toString() || "10",
    });

    const response = await fetch(`https://todo-pp.longwavestudio.dev/posts?${queryParams}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`https://todo-pp.longwavestudio.dev/posts/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
