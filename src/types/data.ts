// data.ts
export type TIngredient = {
	_id:string;
	name:string;
	type:string;
	proteins:number;
	fat:number;
	carbohydrates:number;
	calories:number;
	price:number;
	image:string;
	image_mobile:string;
	image_large:string;
	__v:number;
};

export type TOrder = {
	[key: string]: any;
}

export type TUser = {
	name: string;
	email: string;
}