<template>
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div
              class="text-xs font-weight-bold text-warning text-uppercase mb-1"
            >
              {{ candidate }}
            </div>
            <div class="col mb-2">
              <img
                :src="'http://localhost:8000/storage/image/' + image"
                height="100"
                alt="gambar"
                style="border-radius: 50%"
              />
            </div>
            <p>
              {{ vision }}
            </p>
            <div class="row">
              <div class="col-4">
                <button
                  class="btn btn-info"
                  data-toggle="modal"
                  data-target="#detail"
                >
                  Detail
                </button>
              </div>
              <div class="col-6 float-end">
                <button class="btn btn-success">Vote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal detail -->
  <div
    class="modal fade"
    id="detail"
    tabindex="-1"
    role="dialog"
    aria-labelledby="detailLabel"
    aria-hidden="true"
    ref="detailRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailLabel">Detail Candidate</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img
            :src="'http://localhost:8000/storage/image/' + image"
            height="100"
            alt="gambar"
          />
          <div class="row">
            <h4>{{candidate}}</h4>
            <p>{{vision}}</p>
            <p>{{mission}}</p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Tambah</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal detail -->
</template>
<script>
export default {
  props: {
    candidate: String,
    vision: String,
    mission: String,
    image: String,
  },
};
</script>