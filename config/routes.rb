Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "welcome#index"

  namespace :admin do
    root to: "events#index"
    resources :events, only: [:index, :show]
    resources :send_invite_email, only: [:update]
  end

  namespace :api do
    namespace :v1 do
      resources :email_confirmation, only: [:show, :update]
      resources :authorize, only: [:create]
    end
  end

  resources :thank_you, only: [:show]
  resources :email_confirmation, only: [:show]
  resources :events, only: [:index]
end
