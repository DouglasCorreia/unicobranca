import { handleFooter } from "./components/footer";
import { HandleHeader } from "./components/header";
import { lazyLoad, lazyLoadCss } from "./libs/sd-lazyload";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

document.addEventListener("DOMContentLoaded", function() {
	const buildBannersSectionOnSwiper = () => {
		new Swiper('.banners__swiper', {
			loop: false,
			speed: 500,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.swiper-banners-pagination',
				clickable: true,
			}
		});
	};

	const initAnimations = () => {
		const elementsToAnimate = document.querySelectorAll('.animation__fade-up');

		const observer = new IntersectionObserver((entrys) => {
			entrys.forEach((currentEntry) => {
				if (currentEntry.isIntersecting) {
					currentEntry.target.classList.add('animation__started');

					observer.unobserve(currentEntry.target);
				}
			});
		}, {
			threshold: 0.1 // 10% do elemento precisa estar visível
		});

		elementsToAnimate.forEach((currentElement) => {
			observer.observe(currentElement);
		});
	};

	const getAndShowDataSheet = () => {
		const toCamelCase = (str) => {
			return str
				.toString()
				.normalize("NFD") // remove acentos
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^a-zA-Z0-9 ]/g, "") // remove símbolos
				.split(' ')
				.map((word, index) =>
				index === 0
					? word.toLowerCase()
					: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				)
				.join('');
		}

		const convertKeysToCamelCase = (data) => {
			return data.map(row => {
				const newRow = {};
				for (const key in row) {
				newRow[toCamelCase(key)] = row[key];
				}
				return newRow;
			});
		}

		const normalize = (str) => {
			return str
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase()
				.trim();
		};

		const formatCoin = (value) => {
			return new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format(value);
		}

		const works = ['atendentes', 'auxiliar', 'técnico de enfermagem', 'técnico de laboratório', 'auxiliar de laboratório', 'auxiliar de radioterapia', 'técnico de radioterapia', 'auxiliar de vida escolar', 'técnico em imobilização ortopédica', 'instrumentador cirúrgico', 'auxiliar de instrumentação cirúrgica', 'cuidador de idoso', 'recursos humanos', 'departamento pessoal', 'auxiliar de contabilidade', 'administração', 'recepcionista', 'auxiliar de serviços gerais', 'auxiliar de limpeza', 'motorista de ambulância', 'maqueiro', 'serviço de manutenção', 'técnico de eletroencefalografia', 'auxiliar de eletroencefalografia', 'técnico de eletrocardiografia', 'auxiliar de eletrocardiografia', 'auxiliar de hemoterapia', 'técnico de hemoterapia', 'auxiliar em saúde bucal'];
		const normalizedWorks = works.map(normalize);

		document.getElementById('upload').addEventListener('change', function(e) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: 'array' });

				// Supondo que você quer a primeira planilha
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];

				// Converte para array de objetos (cada linha vira um objeto com colunas como chaves)
				const jsonData = XLSX.utils.sheet_to_json(sheet); // `header: 1` retorna array de arrays
				const camelCasedData = convertKeysToCamelCase(jsonData);

				camelCasedData.forEach(item => {
					const cargoNormalizado = normalize(item.cargo);
					
					if (normalizedWorks.includes(cargoNormalizado)) {
						console.log(item);
						let html = `<li>
							<span><b>Nome do empregador:</b> ${item.nomeEmpregador}</span>
							<span><b>Cargo:</b> ${item.cargo}</span>
							<span><b>Salário:</b> ${formatCoin(item.salario)}</span>
							<span><b>Parcelas:</b> 03 parcelas de ${formatCoin(item.parcela)}</span>
						</li>`

						document.querySelector('#output ul').insertAdjacentHTML('beforeend', html);
					}
				});
			};

			reader.readAsArrayBuffer(file);
		});
	}

	lazyLoad();
	lazyLoadCss();
	HandleHeader();
	handleFooter();
	buildBannersSectionOnSwiper();
	initAnimations();
	getAndShowDataSheet();
}, false);
