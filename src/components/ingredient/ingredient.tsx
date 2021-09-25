import React, { useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; 
import { useSelector, useDispatch } from '../../utils/hooks';
import { MOVE_CONSTRUCTOR } from '../../services/actions';
import { useDrag,  useDrop } from 'react-dnd';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import IngStyles from './ingredient.module.css';

import type { TIngredient } from '../../types/data';

interface IIngredientProps {
	details: any;
	clickHandle: (event:any) => void;
	isLocked: boolean;
	type?: 'top' | 'bottom' | undefined;
	listkey?: number;
}

type TConstructor = ReturnType<typeof ConstructorElement>;
// const ConstructorElementOmit:Omit<TConstructor, 'handleClose'> = ConstructorElement;


const Ingredient = (props:IIngredientProps) => {
	var type = (props.type) ? props.type : undefined;
	var name = props.details.product.name;
	if (props.type && props.type === "top") name = props.details.product.name+' (верх)';
	if (props.type && props.type === "bottom") name = props.details.product.name+' (низ)';
	const arraykey = useSelector( store => store.burger.ingredients.all ).indexOf(props.details.product);

	const id = [props.listkey, props.details.product._id].join("-");
	const index = props.listkey;
	const dispatch = useDispatch();

	const ref = useRef<HTMLLIElement>(null);

	const [{ handlerId }, drop] = useDrop({
    accept: 'movedingredient',
    collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        };
    },
    hover(item:any, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
            return;
        }
        // Вызываем с двумя полученными индексами наше действие
        dispatch({
        	type: MOVE_CONSTRUCTOR,
        	fromIndex: dragIndex,
        	toIndex: hoverIndex,
        })
        // Note: we're mutating the monitor item here, but it's good here for the sake of performance to avoid expensive index searches.
    		item.index = hoverIndex;
    },
    });

	const [, drag] = useDrag({
      type: 'movedingredient',
      item: () => {
          return { id, index };
      },
      collect: (monitor) => ({
          // isDragging: monitor.isDragging(),
      }),
  });
  drag(drop(ref));

	return (
	  <li
	  	className="pl-8 ingredient"
	  	onClick={props.clickHandle}
	  	arraykey={arraykey}
	  	listkey={props.listkey}
	  	data-modaltype="ingredients"
	  	draggable
	  	ref={ref}
	  	index={props.listkey}
	  	data-handler-id={handlerId}
	  	id={[props.listkey, props.details.product._id].join("-")}
	  >
		{ !props.isLocked ? (
			<span className={IngStyles.icon}><DragIcon type="primary" /></span>) : null
		}
	    <ConstructorElement
	    	type={type}
	        text={name}
	        isLocked={props.isLocked}
	        price={props.details.product.price}
	        thumbnail={props.details.product.image}
	        // handleClose={props.clickHandle} TODO
	      />
	  </li>
	);
}

export default Ingredient;