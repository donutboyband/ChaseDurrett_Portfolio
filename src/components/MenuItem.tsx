import { useState, useEffect } from 'react';

interface MenuItemProps {
	itemsArr: string[];
	link: string;
	borders?: boolean;
	href: string;
	onClose: () => void;
	onNavigate: (href: string) => void;
}

export default function MenuItem({
	itemsArr,
	link,
	borders = true,
	href,
	onClose,
	onNavigate
}: MenuItemProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	const handleClick = () => {
		onClose();
		onNavigate(href);
	};

	return (
		<button
			type="button"
			className={`relative w-full flex items-center justify-center py-4 sm:py-2 cursor-pointer md:hover:text-black transition-all duration-200 group min-h-[56px] sm:min-h-0 ${
				borders ? 'border-b border-t border-white' : ''
			} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
			style={{
				transition: 'opacity 300ms, transform 300ms'
			}}
			onClick={handleClick}
		>
			<div className="embla absolute w-0 h-full bg-tertiary inset-0 md:group-hover:w-full transition-all duration-200 ease-in-out opacity-0 md:group-hover:opacity-100 flex items-center justify-center overflow-hidden">
				<div className="embla__container w-full h-full flex">
					{itemsArr.map((item, index) => (
						<div key={index} className="embla__slide flex items-center justify-center h-full">
							<p className="opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-in-out">
								{item}
							</p>
							<span>&#8600;</span>
						</div>
					))}
				</div>
			</div>
			<div className="w-full h-full flex items-center justify-center transition-all duration-100 text-white md:group-hover:text-black">
				{link}
			</div>
		</button>
	);
}
