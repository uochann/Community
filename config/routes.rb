Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations'
  }
  root to: "rooms#index"
  resources :users, only: [:edit, :update]
  resources :rooms do
    resources :messages, only: [:index, :create]
  end
end