import Tracker from "@/components/tracker";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Tracker />
		</QueryClientProvider>
	);
}

export default App;
