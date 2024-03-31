export interface IPersistanceConfig {
	storage: IStorage;
	disabled: boolean;
	clear_on_reload: boolean;
}

export interface IStorage {
	save: (data: any) => void;
	load: () => string | null;
	clear: () => void;
}

export class LocalStoragePersistence implements IStorage {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	save(data: any) {
		localStorage.setItem(this.key, JSON.stringify(data));
	}

	load() {
		const data = localStorage.getItem(this.key);
		return data ? JSON.parse(data) : null;
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}

export const defaultPersistanceConfig: IPersistanceConfig = {
	disabled: true,
	clear_on_reload: false,
	storage: new LocalStoragePersistence("shopping_cart"),
};
