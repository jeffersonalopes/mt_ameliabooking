class EventItem extends View{
    constructor(elemento, scope, baseUrl){
        super(elemento, scope, baseUrl);
    }
    template(model,baseUrl){
        return (model.map((e,key) => {
			if(e && e.periods){
				let startDate = moment(e.periods[0].periodStart);
				let endDate = moment(e.periods[0].periodEnd);
				const month_labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
				const month_names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
				let startDateStr = `${startDate.format('D') } de ${month_names[startDate.month()]} de ${startDate.format('YYYY')}`;
				let endDateStr = `${endDate.format('D') } de ${month_names[endDate.month()]} de ${endDate.format('YYYY')}`;
				return (
					`<div class="mt_event_item"> 
						<div class="mt_row">
						<div class="mt_event_date">
							<span>${month_labels[startDate.month()]}</span>
							${startDate.format('D')}
						</div>
						<div class="mt_event_title">
							<h4>${e.name} - ${e.organizer ? e.organizer?.firstName : ''} ${e.organizer ? e.organizer?.lastName : ''}
								<span class="${e.closed || !e.bookable ? 'closed' : 'oppened'}">
									Inscrições ${e.closed || !e.bookable ? 'Encerradas' : 'Abertas'}
								</span>
							</h4>
							<h5> 
								<img src="${baseUrl}resources/svg/map_pointer_icon.svg" />
								${ e.location ? e.location.name : '' }
								<img src="${baseUrl}resources/svg/clock_icon.svg" />
								 ${startDateStr}  ${startDate.subtract(3, 'hours').format('HH:mm')} -
								 ${startDateStr == endDateStr ? endDate.subtract(3, 'hours').format('HH:mm') : endDateStr + ' ' + endDate.subtract(3, 'hours').format('HH:mm') }
							</h5>
						</div>
						<div class="mt_action_button">
							<button class="btn_open" onclick="toggleDetails(${key})">
								+ Detalhes
							</button>
						</div>
					</div>
					<div class="mt_row">
						<div class="mt_event_details" id="mt_event_details_${key}">
							<div class="mt_event_details_container">
								<div class="mt_event_details_title"> 
									<h4>Sobre este evento
										<img onclick="toggleDetails(${key})" src="${baseUrl}resources/svg/arrow.svg" />
									</h4>
								</div>
								<div class="mt_event_details_description">
									<p>
										${e.description}
									</p>
									<button class="mt_btn_default" onclick="toggleSubmission(${key})">
										Inscreva-se
									</button>
								</div>
							</div>
							<div class="mt_event_details_subscriptions" id="mt_event_details_subscriptions_${key}">
								<div class="mt_row">
									<div class="mt_column">
										<label> * Primeiro Nome: </label>
										<input onchange="firstName = this.value" type="text" class="form-control">
									</div>
									<div class="mt_column">
										<label> * Sobrenome: </label>
										<input onchange="lastName = this.value" type="text" class="form-control">
									</div>
								</div>
								<div class="mt_row">
									<div class="mt_column">
										<label> * Email: </label>
										<input  onchange="email = this.value" type="text" class="form-control">
									</div>
									<div class="mt_column phone">
										<label> * Telefone: </label>
										<img src="${baseUrl}resources/svg/flag.svg">
										<input onchange="phone = this.value"  style="padding-left: 84px;" type="text" class="form-control">
									</div>
								</div>
								<div class="mt_row">
									<div class="mt_column">
										<label> Oque trouxe você até a MT? </label>
										<div class="mt_checkbox_container">
											<div class="item">
												<input type="checkbox" id="origin" name="Saude fisica" >
												<label for="origin">Saude fisica</label>
											</div>
											<div class="item">
												<input type="checkbox" id="origin" name="Saude mental" >
												<label for="origin">Saude mental</label>
											</div>
											<div class="item">
												<input type="checkbox" id="origin" name="Inteligência emocional" >
												<label for="origin">Inteligência emocional</label>
											</div>
											<div class="item">
												<input type="checkbox" id="origin" name="Potencia mental" >
												<label for="origin">Potencia mental</label>
											</div>
											<div class="item">
												<input type="checkbox" id="origin" name="Bem-estar" >
												<label for="origin">Bem-estar</label>
											</div>
											<div class="item">
												<input type="checkbox" id="origin" name="Tranquilidade" >
												<label for="origin">Tranquilidade</label>
											</div>
										</div>
									</div>
									<div class="mt_column" style="justify-content: flex-start;
									height: 308px;
									margin-top: 30px;">
										<label>
										* Li e aceito as políticas de privacidade.* Autorizo que a Meditação Transcendental utilize 
										meus dados para atividades comerciais e de marketing com a empresa.
										</label>
										<div class="mt_checkbox_container">
											<div class="item">
												<input type="checkbox" id="terms" name="aceito" >
												<label for="terms">Aceito</label>
											</div>
										</div>
									</div>
								</div>
								<div class="mt_row confirm">
									<div class="mt_column">
										<button onClick="bookingEvent(${e.id})" class="mt_btn_default"> Confirmar </button>
									</div>
								</div>
							</div>
						</div>
					</div>
					 </div>`
				)
			}
			}).join(''))
    }
}