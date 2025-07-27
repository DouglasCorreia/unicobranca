import { handleFooter } from "./components/footer";
import { handleHeader } from "./components/header";
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
		};

		const getParcelaValue = (salary) => {
			const rules = {
				ate2000: () => 29.00,
				ate2800: () => 39.00,
				acima2800: () => 49.00,
			};

			if (salary <= 2000.00) return rules.ate2000();
			if (salary <= 2800.00) return rules.ate2800();
			return rules.acima2800();
		};

		const formatDate = (date) => {
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}

		const works = ['atendentes', 'auxiliar', 'técnico de enfermagem', 'técnico de laboratório', 'auxiliar de laboratório', 'auxiliar de radioterapia', 'técnico de radioterapia', 'auxiliar de vida escolar', 'técnico em imobilização ortopédica', 'instrumentador cirúrgico', 'auxiliar de instrumentação cirúrgica', 'cuidador de idoso', 'recursos humanos', 'departamento pessoal', 'auxiliar de contabilidade', 'administração', 'recepcionista', 'auxiliar de serviços gerais', 'auxiliar de limpeza', 'motorista de ambulância', 'maqueiro', 'serviço de manutenção', 'técnico de eletroencefalografia', 'auxiliar de eletroencefalografia', 'técnico de eletrocardiografia', 'auxiliar de eletrocardiografia', 'auxiliar de hemoterapia', 'técnico de hemoterapia', 'auxiliar em saúde bucal'];
		const normalizedWorks = works.map(normalize);

		document.getElementById('upload').addEventListener('change', function(e) {
			const file = e.target.files[0];
			const reader = new FileReader();

			const currentDay = new Date();
			const firstInstallment = new Date(currentDay);
			const secondInstallment = new Date(currentDay);
			const thirdInstallment = new Date(currentDay);

			firstInstallment.setDate(firstInstallment.getDate() + 3);
			secondInstallment.setDate(secondInstallment.getDate() + 6);
			thirdInstallment.setDate(thirdInstallment.getDate() + 9);

			reader.onload = function(e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];
				const jsonData = XLSX.utils.sheet_to_json(sheet);
				const camelCasedData = convertKeysToCamelCase(jsonData);

				camelCasedData.forEach(item => {
					const cargoNormalizado = normalize(item.cargo);
					const parcelValue = getParcelaValue(item.salario);
					
					if (normalizedWorks.includes(cargoNormalizado)) {
						let html = `<li>
							<span><b>Nome do empregador:</b> ${item.nomeEmpregador}</span>
							<span><b>Cargo:</b> ${item.cargo}</span>
							<span><b>Salário:</b> ${formatCoin(item.salario)}</span>
							<span><b>Parcelas:</b> 03 parcelas de ${formatCoin(parcelValue)}</span>
							<span><b>Data de vencimento da 1º parcela:</b> ${formatDate(firstInstallment)}</span>
							<span><b>Data de vencimento da 2º parcela:</b> ${formatDate(secondInstallment)}</span>
							<span><b>Data de vencimento da 3º parcela:</b> ${formatDate(thirdInstallment)}</span>
							<span><b>Endereço da empresa:</b> ${item.enderecoEmpregadoremresa}</span>
							<span><b>CNPJ da empresa:</b> ${item.cnpj}</span>
						</li>`

						document.querySelector('#output ul').insertAdjacentHTML('beforeend', html);
					}
				});
			};

			reader.readAsArrayBuffer(file);
		});
	}

	const sendEmail = () => {
		document.getElementById('enviar-email').addEventListener('click', function() {
			const dadosParaEnviar = [];

			document.querySelectorAll('#output ul li').forEach(li => {
				const spans = li.querySelectorAll('span');

				const dados = {
					nome: spans[0].textContent.split(': ')[1],
					cargo: spans[1].textContent.split(': ')[1],
					salario: spans[2].textContent.split(': ')[1],
					parcelas: spans[3].textContent.split(': ')[1],
					primeiroVencimento: spans[4].textContent.split(': ')[1],
					segundoVencimento: spans[5].textContent.split(': ')[1],
					terceiroVencimento: spans[6].textContent.split(': ')[1],
					endereco: spans[7].textContent.split(': ')[1],
					cnpj: spans[8].textContent.split(': ')[1],
				};

				dadosParaEnviar.push(dados);
			});

			dadosParaEnviar.forEach(dados => {
				emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", dados)
					.then(response => {
						console.log('Email enviado com sucesso', response.status, response.text);
					}, error => {
						console.error('Erro ao enviar e-mail', error);
					});
			});
		});
	}

	lazyLoad();
	lazyLoadCss();
	handleHeader();
	handleFooter();
	buildBannersSectionOnSwiper();
	initAnimations();
	//getAndShowDataSheet();
}, false);
