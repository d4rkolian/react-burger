import React, { useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'; 
import { useDrag,  useDrop } from 'react-dnd';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import IngStyles from './ingredient.module.css';

const Ingredient = (props) => {
	var type = (props.type) ? props.type : "";
	var name = props.details.product.name;
	if (props.type && props.type === "top") name = props.details.product.name+' (верх)';
	if (props.type && props.type === "bottom") name = props.details.product.name+' (низ)';
	const arraykey = useSelector( store => store.burger.ingredients.all ).indexOf(props.details.product);

	const list = useSelector( store => store.burger.ingredients.constructor );
	const id = [props.listkey, props.details.product._id].join("-");
	const index = props.listkey;
	const dispatch = useDispatch();

	const ref = useRef(null);

	const [{ handlerId }, drop] = useDrop({
    accept: 'movedingredient',
    collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        };
    },
    hover(item, monitor) {
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
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Вызываем с двумя полученными индексами наше действие
        dispatch({
        	type: 'MOVE_CONSTRUCTOR',
        	fromIndex: dragIndex,
        	toIndex: hoverIndex,
        })
        // Note: we're mutating the monitor item here, but it's good here for the sake of performance to avoid expensive index searches.
    		item.index = hoverIndex;
    },
    });

	const [{ }, drag] = useDrag({
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
	  	modaltype="ingredients"
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
	        handleClose={props.clickHandle}
	      />
	  </li>
	);
}

Ingredient.propTypes = {
	details: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	clickHandle: PropTypes.func.isRequired,
	isLocked: PropTypes.bool.isRequired,
	type: PropTypes.string,
}

export default Ingredient;